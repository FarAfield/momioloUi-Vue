<template>
  <a-card>
    <a-spin :spinning="loading">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-card :bordered="false">
            <h1 slot="title">基本信息</h1>
            <a-form :form="form" v-bind="formItemLayout" @submit="onFinish">
              <a-form-item label="角色名称">
                <a-input
                  allowClear
                  :maxLength="20"
                  :disabled="disabled"
                  placeholder="请输入角色名称"
                  v-decorator="['roleName', { rules: [{ required: true, message: '请输入角色名称' }] }]"
                >
                </a-input>
              </a-form-item>
              <a-form-item label="状态">
                <a-radio-group
                  :disabled="disabled"
                  v-decorator="['roleStatus', { rules: [{ required: true, message: '请选择角色状态' }] }]"
                >
                  <a-radio :value="0"> 正常 </a-radio>
                  <a-radio :value="1"> 锁定 </a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="角色说明">
                <a-textarea
                  allowClear
                  :maxLength="200"
                  :autoSize="{ minRows: 4, maxRows: 4 }"
                  :disabled="disabled"
                  placeholder="请输入角色说明"
                  v-decorator="['roleDesc', { rules: [{ required: true, message: '请输入角色说明' }] }]"
                >
                </a-textarea>
              </a-form-item>
              <a-form-item>
                <div style="display: flex; justify-content: center; margin-left: 30%">
                  <a-button v-if="disabled" icon="rollback" @click="() => $router.back()"> 返回 </a-button>
                  <template v-else>
                    <a-button icon="close" @click="() => $router.back()" style="margin-right: 12px"> 取消 </a-button>
                    <a-button icon="check" type="primary" html-type="submit" :loading="submitLoading"> 保存 </a-button>
                  </template>
                </div>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>
        <a-col :span="16">
          <a-card :bordered="false">
            <h3 slot="title">权限配置</h3>
            <a-tree
              :disabled="disabled"
              :checkable="true"
              :selectable="false"
              :checkedKeys="checkedKeys"
              @check="onCheck"
              :treeData="renderTreeNodes"
            >
              <span slot="customTitle" slot-scope="item">
                <a-tag :color="TYPE[item.resourceType]['color']">{{ TYPE[item.resourceType]['value'] }}</a-tag>
                {{ item.resourceName }}
              </span>
            </a-tree>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
  </a-card>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { filterObj } from '../../../utils/util'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
}
const TYPE = {
  1: { value: '菜单', color: '#1890ff' },
  2: { value: '页面', color: '#f5222d' },
  3: { value: '按钮', color: '#52c41a' },
}
export default {
  name: 'UpdateRole',
  data() {
    return {
      formItemLayout,
      TYPE,
      form: this.$form.createForm(this),
      menuData: [],
      checkedKeys: [], // 选中的节点，全选
      checked: [], // 所有节点（包含被半选的）
      disabled: false,
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state['loading'].effects['base/getData'],
      submitLoading: (state) => state['loading'].effects['base/postData'],
    }),
    renderTreeNodes() {
      const transformData = (array) => {
        return array.map((item) => {
          if (item?.children?.length) {
            item.key = item.sid
            item.scopedSlots = { title: 'customTitle' }
            item.disableCheckbox = item.resourceCode === 'superConfig'
            item.children = transformData(item.children)
          } else if (item?.buttonChildren?.length) {
            item.key = item.sid
            item.scopedSlots = { title: 'customTitle' }
            item.disableCheckbox = item.resourceCode === 'superConfig'
            item.children = transformData(item.buttonChildren)
          } else {
            item.key = item.sid
            item.scopedSlots = { title: 'customTitle' }
            item.disableCheckbox = item.resourceCode === 'superConfig'
          }
          return item
        })
      }
      return transformData(this.menuData)
    },
  },
  methods: {
    ...mapActions({
      getData: 'base/getData',
      postData: 'base/postData',
    }),
    ...mapMutations({
      updateBreadcrumbData: 'global/updateBreadcrumbData',
    }),
    searchMenuData() {
      this.getData({ url: '/resource/findCurrentMenu' }).then((res) => {
        this.menuData = res.data?.children || []
      })
    },
    findDetail(sid) {
      this.getData({ url: '/role/findDetail', sid }).then((res) => {
        this.form.setFieldsValue(filterObj(res.data?.role, ['roleName', 'roleStatus', 'roleDesc']))
        this.checkedKeys = res.data.checked
        this.checked = (res.data.checked || []).concat(res.data.halfChecked || [])
      })
    },
    onFinish(e) {
      e.preventDefault()
      const {
        form: { validateFields },
      } = this
      const { query } = this.$route
      validateFields((err, fieldsValue) => {
        if (err) return
        const params = {
          url: query?.sid ? '/role/update' : '/role/create',
          ...fieldsValue,
          resourceSids: this.checked,
          sid: query?.sid,
        }
        this.postData(params).then((res) => {
          this.$message.success(query?.sid ? '编辑成功' : '新增成功')
          this.$router.back()
        })
      })
    },
    onCheck(checkedKeys, e) {
      this.checked = [...new Set(checkedKeys.concat(e.halfCheckedKeys))]
      this.checkedKeys = checkedKeys
    },
  },
  mounted() {
    this.searchMenuData()
    const { query } = this.$route
    if (query?.sid) {
      this.findDetail(query.sid)
    } else {
      this.updateBreadcrumbData({
        breadcrumbData: [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          {
            path: '/system',
            breadcrumbName: '系统管理',
          },
          {
            path: '/updateRole',
            breadcrumbName: '角色新增',
          },
        ],
      })
    }
    if (query.disabled) {
      this.disabled = true
    }
  },
  destroyed() {
    this.updateBreadcrumbData({ breadcrumbData: [] })
  },
}
</script>

<style scoped></style>
