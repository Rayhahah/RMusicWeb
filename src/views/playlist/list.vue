<template>
  <div>
    <el-table v-loading="loading" :data="playlist" stripe style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column label="封面" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="copywriter" label="描述"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="注意"
      :visible.sync="delDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>确定删除该歌单?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/**
 * 跨域的情况
 * 1. http://www.a.com http://www.b.com
 * 2. http://www.a.com:8080 http://www.a.com:8081
 * 3. http://www.a.com http://news.a.com
 * 4. http://www.a.com https://www.a.com
 */
import { fetchList, del } from "@/api/playlist";
import scroll from "@/utils/scroll";
export default {
  data() {
    return {
      playlist: [],
      count: 6,
      loading: false,
      delDialogVisible: false,
      info: {},
    };
  },
  /**
   * 生命周期函数
   */
  created() {
    this.getList();
  },
  mounted() {
    scroll.start(this.getList);
  },

  methods: {
    onEdit(row) {
      this.$router.push("/playlist/edit/" + row._id);
    },
    onDelete(row) {
      this.delDialogVisible = true;
      this.info.id = row._id;
    },
    doDelete() {
      del({
        id: this.info.id,
      }).then((res) => {
        console.log(res);
        if (res.data.deleted > 0) {
          this.delDialogVisible = false;
          this.playlist = [];
          this.getList();
          this.$message({
            message: "删除成功",
            type: "success",
          });
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    getList() {
      this.loading = true;
      fetchList({
        start: this.playlist.length,
        count: this.count,
      }).then((res) => {
        console.log(res);
        this.playlist = this.playlist.concat(res.data);
        if (res.data.length < this.count) {
          scroll.end();
        }
        this.loading = false;
      });
    },
  },
};
</script>
<style >
</style>