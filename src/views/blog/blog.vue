<template>
  <div>
    <el-table
      v-loading="loading"
      :data="blogList"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="头像" width="80">
        <template slot-scope="scope">
          <img :src="scope.row.avatarUrl" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="姓名" width="150">
      </el-table-column>
      <el-table-column
        prop="content"
        label="正文"
        width="350"
      ></el-table-column>
      <el-table-column prop="img.length" label="图片数" width="80">
      </el-table-column>
      <el-table-column prop="img" label="图片预览" width="400">
        <template slot-scope="scope">
          <el-row>
            <el-col
              :span="7"
              v-for="(item, index) in scope.row.imgUrls"
              :key="index"
            >
              <el-image
                style="width: 100px; height: 100px"
                :src="item"
                :preview-src-list="scope.row.imgUrls"
                fit="fit"
              >
              </el-image
            ></el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="日期" width="200">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="onDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      v-loading.fullscreen.lock="fullscreenLoading"
    >
      <span>是否确定删除该博客？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="doDel()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, del } from "@/api/blog";
import scroll from "@/utils/scroll";
import formatTime from "@/utils/formatTime";
export default {
  data() {
    return {
      blogList: [],
      count: 10,
      keyWord: "",
      loading: false,
      dialogVisible: false,
      fullscreenLoading: false,
      currentRow: {},
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    scroll.start(this.getList);
  },
  methods: {
    onDel(row) {
      this.dialogVisible = true;
      this.currentRow = row;
    },
    doDel() {
      console.log(this.currentRow);
      this.fullscreenLoading = true;
      del({
        id: this.currentRow._id,
        img: this.currentRow.img,
      })
        .then((res) => {
          console.log(res);
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.fullscreenLoading = false;
          this.dialogVisible = false;
          this.blogList = [];
          this.getList(0);
        })
        .catch((res) => {
          console.log(res);
          this.fullscreenLoading = false;
        });
    },
    getList(start = this.blogList.length) {
      this.loading = true;
      fetchList({
        start: start,
        count: this.count,
        keyWord: this.keyWord,
      })
        .then((res) => {
          console.log(res);
          const data = res.data;
          let _blogList = [];
          data.forEach((item) => {
            item.createTime = formatTime(new Date(item.createTime));
            _blogList.push(item);
          });
          this.blogList = this.blogList.concat(_blogList);
          if (_blogList.length < this.count) {
            scroll.end();
          }
          this.loading = false;
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style>
.el-col {
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>