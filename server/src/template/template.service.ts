import { Injectable } from '@nestjs/common';
import {  CreateTemplateDTO } from 'src/model/template.model';
@Injectable()
export class TemplateService {
  private  readonly htmlTemplate = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <title>template</title>
      <!--preload-->
      <!--styleHref-->
      
      <style>
      <!--style-->
      </style>
    </head>
    <body>
      <!--content-->
      <!--jsSrc-->

      <script>
      <!--js-->
      </script>
    </body>
  </html>`
  constructor() {}
  
  createTemplate({options,html,style,js}:CreateTemplateDTO) {
    let htmlTemplate = this.htmlTemplate
    htmlTemplate = htmlTemplate.replace('<!--content-->', html).replace('<!--style-->',style).replace('<!--js-->',js)
    return htmlTemplate
  }
}
