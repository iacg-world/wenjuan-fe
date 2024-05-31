import React, { FC, useEffect, useState } from 'react'
import { Form, Input, Upload, message, UploadProps, GetProp } from 'antd'
import { useDispatch } from 'react-redux'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { resetPageInfo, changePageBackground } from '../../../store/pageInfoReducer'
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import styles from './PageSetting.module.scss'

const { TextArea } = Input
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
const PageSetting: FC = () => {
  const [loading, setLoading] = useState(false)
  const { background } = useGetPageInfo()
  const pageInfo = useGetPageInfo()
  // const { title, desc, js, css } = pageInfo
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  // 实时更新表单内容
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 5
    if (!isLt2M) {
      message.error('Image must smaller than 5MB!')
    }
    return isJpgOrPng && isLt2M
  }
  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      changePageBackground('')
      // todo
    }
  }
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )
  const ImageView = (
    <div className={styles.image_view}>
      <div className={styles.image_wrapper}>
        <UploadOutlined style={{ color: 'white', fontSize: '26px' }} />
      </div>
      <img src={background} style={{ height: '100%' }} />
    </div>
  )
  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item label="问卷标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="问卷描述..." />
      </Form.Item>
      <Form.Item label="问卷背景" name="background">
        <Upload
          action="/upload.do"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {background ? ImageView : uploadButton}
        </Upload>
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="输入 CSS 样式代码..." />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="输入 JS 脚本代码..." />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
