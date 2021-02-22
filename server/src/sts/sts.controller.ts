import { Controller, Get } from '@nestjs/common';
import { STS } from 'ali-oss'


@Controller('sts')
export class StsController {
    config = {
    AccessKeyId: process.env.ALI_SDK_STS_ID,
    AccessKeySecret: process.env.ALI_SDK_STS_SECRET,
    RoleArn: process.env.ALI_SDK_STS_ROLE,
    // 建议 Token 失效时间为 1 小时
    TokenExpireTime: 3600,
    Policy: `{
      "Statement": [
        {
          "Action": [
            "oss:*"
          ],
          "Effect": "Allow",
          "Resource": ["acs:oss:*:*:*"]
        }
      ],
      "Version": "1"
    }
    `}
  
  stsObj = new STS({
    accessKeyId: this.config.AccessKeyId,
    accessKeySecret:this.config.AccessKeySecret
  })

  @Get()
  async sts() { 
    let {credentials} = await this.stsObj.assumeRole(this.config.RoleArn, this.config.Policy, this.config.TokenExpireTime)
    return {...credentials,aliOSS_region:process.env.ALIOSS_REGION,aliOSS_bucket:process.env.ALIOSS_BUCKET,aliOSS_baseUrl:process.env.ALIOSS_BASE_URL};
  }
}
