<template>
  <a-row>
    <a-col :span="8">
      <a-card :bordered="false" style="height: 600px; padding: 36px">
        <a-spin :spinning="loading">
          <p style="font-weight: bold; font-size: 16px; margin-bottom: 6px">组织管理</p>
          <a-space style="margin-left: 24px" size="middle">
            <a v-if="record.sid" @click="handleOpenModal('create')" v-action="'org_create'"> 新增 </a>
            <a
              v-if="record.sid && record.orgCode !== 'root'"
              @click="handleOpenModal('update')"
              v-action="'org_update'"
            >
              编辑
            </a>
            <a-popconfirm
              title="是否确认删除？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="handleDelete(record)"
              v-action="'org_delete'"
            >
              <a v-if="record.sid && record.orgCode !== 'root'" style="color: red"> 删除 </a>
            </a-popconfirm>
          </a-space>
          <a-tree
            @select="onSelect"
            :treeData="treeList"
            :replaceFields="{ children: 'orgChildList', title: 'orgName', key: 'sid' }"
          >
          </a-tree>
        </a-spin>
      </a-card>
    </a-col>
    <a-col :span="16">
      <a-card :bordered="false" style="height: 600px; padding: 36px">
        <a-spin :spinning="detailLoading === true">
          <a-descriptions title="组织信息">
            <a-descriptions-item :span="3" label="组织名称">
              {{ record.orgName }}
            </a-descriptions-item>
            <a-descriptions-item :span="3" label="组织类型">
              {{ getValueByKey(TYPE, ['value', 'label'], record.orgType) }}
            </a-descriptions-item>
            <a-descriptions-item :span="3" label="组织编码">
              {{ record.orgCode }}
            </a-descriptions-item>
            <a-descriptions-item :span="3" label="组织简介">
              {{ record.orgDesc }}
            </a-descriptions-item>
          </a-descriptions>
        </a-spin>
      </a-card>
    </a-col>
    <common-modal-form
      :visible="visible"
      :initialValues="configData.initialValues"
      :form-data="formData"
      :save-url="['/org/create', '/org/update']"
      :form-items="formItems"
      :handle-callback="handleCallback"
      :handle-cancel="handleCancel"
    />
  </a-row>
</template>

<script>
import CommonModalForm from '../../../components/Momiolo/CommonModalForm'
import { mapActions, mapState } from 'vuex'
import { getValueByKey } from '../../../utils/util'
export default {
  name: 'Org',
  components: {
    'common-modal-form': CommonModalForm,
  },
  data() {
    return {
      TYPE: [
        { value: 'SysAdmin', label: '超级管理员' },
        { value: 'Admin', label: '管理员' },
        { value: 'User', label: '用户' },
        { value: 'Guest', label: '访客' },
      ],
      treeList: [],
      record: {},
      visible: false,
      formData: {},
      configData: {
        orgParentOptions: [],
        initialValues: {},
      },
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state['loading'].effects['base/getData'],
      detailLoading: (state) => state['loading'].effects['base/getDataWithRes'],
    }),
    formItems() {
      return [
        {
          key: 'orgParentSid',
          title: '所属上级',
          type: 'select',
          rules: [{ required: true, message: '请输入所属上级' }],
          readOnly: [true, true],
          selectOptions: this.configData.orgParentOptions,
        },
        {
          key: 'orgName',
          title: '组织名称',
          type: 'input',
          rules: [
            { required: true, message: '请输入组织名称' },
            { max: 20, message: '最大字符长度20' },
          ],
          maxLength: 20,
        },
        {
          key: 'orgType',
          title: '组织类型',
          type: 'select',
          rules: [{ required: true, message: '请选择组织类型' }],
          selectOptions: this.TYPE,
        },
        {
          key: 'orgCode',
          title: '组织编码',
          type: 'input',
          rules: [
            { required: true, message: '请输入组织编码' },
            { message: '由数字、26个英文字母或者下划线组成的2-20位字符!', pattern: /^[\w]{2,20}$/ },
          ],
        },
        {
          key: 'orgDesc',
          title: '组织简介',
          type: 'textArea',
          rules: [{ max: 200, message: '最大字符长度200' }],
          maxLength: 200,
        },
      ]
    },
  },
  methods: {
    ...mapActions({
      getData: 'base/getData',
      postData: 'base/postData',
      getDataWithRes: 'base/getDataWithRes',
    }),
    getValueByKey,
    handleSearch() {
      this.getData({ url: '/org/findOrgTree' }).then((res) => {
        this.treeList = [res.data]
      })
    },
    handleDelete(record) {
      this.postData({ url: '/org/delete', sid: record.sid }).then((res) => {
        this.$message.success('删除成功')
        this.handleSearch()
        this.record = {}
      })
    },
    onSelect(selectedKeys) {
      if (selectedKeys.length === 1) {
        this.getDataWithRes({ url: '/org/findDetail', sid: selectedKeys[0] }).then((res) => {
          if (res.statusCode === '0') {
            this.record = res.data
          }
        })
      } else {
        this.record = {}
      }
    },
    handleCallback() {
      this.handleSearch()
      this.onSelect([this.record.sid])
    },
    handleCancel() {
      this.visible = false
      this.formData = {}
    },
    handleOpenModal(type) {
      const { record } = this
      if (type === 'update') {
        this.visible = true
        this.formData = record
        this.configData = {
          orgParentOptions: [{ value: record.orgParentSid, label: record.orgParentName }],
          initialValues: { orgParentSid: record.orgParentSid },
        }
      } else if (type === 'create') {
        this.visible = true
        this.configData = {
          orgParentOptions: [{ value: record.sid, label: record.orgName }],
          initialValues: { orgParentSid: record.sid },
        }
      }
    },
  },
  mounted() {
    this.handleSearch()
  },
}
</script>

<style scoped></style>
