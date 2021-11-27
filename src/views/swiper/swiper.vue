<template>
  <div>
    <div class="filter-container">
      <el-upload
        class="upload-demo"
        action="http://localhost:3000/swiper/upload"
        :on-success="uploadSuccess"
        :show-file-list="false"
      >
        <el-button class="upload-button" size="medium" type="primary"
          >点击上传</el-button
        >
      </el-upload>
    </div>
    <el-table v-loading="loading" :data="swiperList" stripe style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column label="Banner" width="400">
        <template slot-scope="scope">
          <img :src="scope.row.download_url" alt height="100" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDelete(scope.row)"
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
      <span>是否确定删除该轮播图？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="onConfirmDelete()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, del } from "@/api/swiper";
export default {
  data() {
    return {
      dialogVisible: false,
      swiperList: [],
      count: 3,
      loading: false,
      fullscreenLoading: false,
      currentRow: {},
    };
  },
  created() {
    console.log("swiper create");
    this.getList();
    console.log("swiper getList");
  },
  methods: {
    onDelete(row) {
      this.dialogVisible = true;
      this.currentRow = row;
    },
    onConfirmDelete() {
      console.log(this.currentRow);
      this.fullscreenLoading = true;
      del({
        fileid: this.currentRow.fileid,
        id: this.currentRow._id,
      })
        .then((res) => {
          console.log(res);
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.fullscreenLoading = false;
          this.getList();
        })
        .catch((res) => {
          console.log(res);
          this.fullscreenLoading = false;
        });
    },
    uploadSuccess(res) {
      console.log(res);
      if (res.id_list.length > 0) {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.getList();
      }
    },
    getList() {
      this.loading = true;
      fetchList({
        start: 0,
        count: 30,
      }).then((res) => {
        this.loading = false;
        this.swiperList = res.data;
        console.log(res);
      });
    },
  },
};
</script>

<style>
.upload-demo {
  display: flex;
  justify-content: center;
}
.upload-button {
  margin-top: 10px;
  width: 700px;
  margin-bottom: 50px;
}
</style>