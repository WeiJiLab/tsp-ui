import React from 'react'
import { Button, Form } from 'antd'
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { PlusOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../hooks'

import toast from 'react-hot-toast'
import { createProject } from '../../../redux/project/project-thunks'
import { projectSlice } from '../../../redux/project/project-slice'

interface FormTypes {
  name: string
  description: string
}

export const CreateProject: React.FC = () => {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm<FormTypes>()

  const postData = async (values: FormTypes) => {
    try {
      await dispatch(createProject({ ...values })).unwrap()
      toast.success(`创建项目成功`)
      dispatch(projectSlice.actions.refreshPage())
      return true
    } catch (err) {
      return true
    }
  }

  return (
    <ModalForm<FormTypes>
      title={`新增项目`}
      trigger={
        <Button type='primary'>
          <PlusOutlined />
          新增项目
        </Button>
      }
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('Cancel Edit'),
      }}
      onFinish={async (values) => {
        return postData(values)
      }}
    >
      <ProFormText
        width='md'
        name='name'
        label='项目名称'
        tooltip='最长为 24 位'
        placeholder='请输入项目名称'
      />

      <ProFormTextArea
        width='xl'
        name='description'
        label='项目描述'
        placeholder='请输入项目描述'
      />
    </ModalForm>
  )
}
