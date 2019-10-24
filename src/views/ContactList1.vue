<template>
  <div class="home">
    <!-- 联系人列表 -->
    <van-contact-list :list="list" @add="onAdd" @edit="onEdit" />
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
// @ is an alias to /src
import { ContactList, Toast, ContactEdit, Popup } from "vant";
// import axios from "axios";
export default {
  name: "ContactList",
  components: {
    [ContactList.name]: ContactList,
    [Toast.name]: Toast,
    [ContactEdit.name]: ContactEdit,
    [Popup.name]: Popup
  },
  created() {
    // this.instance = axios.create({
    //   baseURL: "http://localhost:9000/api",
    //   timeout: 1000
    // });
    this.getList();
  },
  data() {
    return {
      //   {s
      //       id:1,
      //       name:'ass',
      //       tel:''
      //   }
      list: [],
      // instance: null, // axios实例
      showEdit: false, // 编辑弹窗显示
      editingContact: {}, //正在编辑的联系人
      isEdit: false // 新建or编辑
    };
  },
  methods: {
    // 添加联系人
    onAdd() {
      this.showEdit = true;
      this.isEdit = false;
    },
    // 编辑联系人
    onEdit(info) {
      this.showEdit = true;
      this.isEdit = true;
      this.editingContact = info;
    },
    // 保存
    async onSave(info) {
      if (this.isEdit) {
        // 编辑保存
        let res = await this.$Http.editContact(info);

        if (res.code === 200) {
          Toast("编辑成功");
          this.showEdit = false;
          this.getList();
        }
      } else {
        // 新建保存
        let res = await this.$Http.newContactJson(info);
        if (res.code === 200) {
          Toast("新建成功");
          this.showEdit = false;
          this.getList();
        }
      }
    },
    // 删除
    async onDelete(info) {
     let res = await this.$Http.delContact({
        id: info.id
      });
      if (res.code === 200) {
        Toast("新建成功");
        this.showEdit = false;
        this.getList();
      }
    },

    async getList() {
      let res = await this.$Http.getContactList();
      this.list = res.data;
    }
  }
};
</script>


<style scoped>
.van-contact-list_add {
  z-index: 0;
}
.van-popup {
  height: 100%;
}
</style>