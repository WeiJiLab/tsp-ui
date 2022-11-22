import { BaseModel } from '../@types'

export type AppInfoForm = {
  projectId: number
  name: string
  description: string
  repo: string
  branch: string
  username: string
  password: string
  repoType: string
  codePath: string
}

export type AppInfoModel = AppInfoForm & BaseModel
