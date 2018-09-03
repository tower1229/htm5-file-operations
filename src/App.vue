<template>
  <div id="app">
    <el-upload class="myUpload"
      drag
      action=""
      accept="application/json"
      :before-upload="getFile">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">导入JSON文件</div>
    </el-upload>
    <div class="m">
      <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入内容"
        v-model="fileText"
        @change="saveFile">
      </el-input>
    </div>
    <a id="Download" download="download.json" target="_blank" class="DownloadArea">保存JSON文件</a>
    <footer class="foot">
        <p>© 2018 - 3018  Author
            <a href="https://refined-x.com/" target="_blank">雅X共赏</a> 
        </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      fileText: null,
      DownloadDom: null
    };
  },
  methods: {
    readLocalFile: function(file, callback) {
      var reader = new FileReader();
      //将文件以文本形式读入页面
      reader.readAsText(file);
      reader.onload = function() {
        typeof callback === "function" && callback(this.result);
      };
    },
    saveFile: function() {
      if (this.DownloadDom) {
        let blobStr = [this.fileText];
        var myBlob = new Blob(blobStr, { type: "application/json" });
        this.DownloadDom.href = window.URL.createObjectURL(myBlob);
        console.log('下载文件已就绪')
      }
    },
    getFile: function(file) {
      this.readLocalFile(file, result => {
        this.fileText = result.replace(/\s/g, "");
        this.saveFile();
      });
      return false;
    }
  },
  mounted: function() {
    this.DownloadDom = document.getElementById("Download");
  }
};
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  width: 960px;
  height: 100%;
}
.m {
  margin-top: 20px;
  margin-bottom: 20px;
}

.myUpload .el-upload {
  display: block;
}
.myUpload .el-upload-dragger {
  width: 100%;
}

.DownloadArea {
  display: block;
  height: 100px;
  line-height: 100px;
  border: 1px dashed #ccc;
  background: #f5f5f5;
  transition: background ease 0.5s;
  cursor: pointer;
  border-radius: 6px;
  text-decoration: none;
  color:#333;
}
.DownloadArea:hover {
  background: #fff;
}

.foot {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #333;
    padding: 24px;
    overflow: hidden;
    color: #999;
    font-size: 14px;
    text-align: center;
}
.foot a{color:#fff;margin:0 .5em}
</style>
