import React from 'react'
import { Form } from 'antd'
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import { useAppDispatch } from '../../../hooks'

import { BaseModel } from '../../../@types'
import toast from 'react-hot-toast'
import { Project } from '../../../models'
import { updateProject } from '../../../redux/project/project-thunks'
import { projectSlice } from '../../../redux/project/project-slice'

interface FormTypes extends BaseModel {
  name: string
  description?: string
}

export const UpdateProject: React.FC<Project> = ({ id, name, description }) => {
  const dispatch = useAppDispatch()

  const patchData = async (values: FormTypes) => {
    try {
      await dispatch(
        updateProject({
          id: id,
          name: values.name,
          description: values.description,
        }),
      ).unwrap()
      toast.success(`更新项目信息成功`)
      dispatch(projectSlice.actions.refreshPage())
      return true
    } catch (err) {
      return true
    }
  }

  const [form] = Form.useForm<FormTypes>()

  return (
    <ModalForm<FormTypes>
      title={`编辑项目信息`}
      trigger={<a>编辑</a>}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('Cancel Edit'),
      }}
      onFinish={async (values) => {
        console.log(values.name, values.description)
        return patchData(values)
      }}
    >
      <ProFormText
        width='md'
        name='name'
        label='项目名称'
        tooltip='最长为 24 位'
        placeholder='请输入项目名称'
        initialValue={name}
      />

      <ProFormTextArea
        width='xl'
        name='description'
        label='项目描述'
        placeholder='请输入项目描述'
        initialValue={description}
      />
    </ModalForm>
  )
}
