import { Module } from '@nestjs/common'
import { FilesController } from './files.controller'
import { FilesService } from './files.service'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import dayjs = require('dayjs')
import * as nuid from 'nuid'

@Module({
    controllers: [FilesController],
    providers: [FilesService],
    imports: [
        MulterModule.register({
            storage: diskStorage({
                // 配置文件上传后的文件夹路径
                destination: `./public/uploads/${dayjs().format('YYYY-MM-DD')}`,
                filename: (req, file, cb) => {
                    // 在此处自定义保存后的文件名称
                    const filename = `${nuid.next()}.${
                        file.mimetype.split('/')[1]
                    }`
                    return cb(null, filename)
                }
            })
        })
    ]
})
export class FilesModule {}
