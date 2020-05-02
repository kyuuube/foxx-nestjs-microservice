import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('files')
@Controller('files')
export class FilesController {
    @ApiOperation({ summary: '上传头像' })
    @Post('avatar')
    @UseInterceptors(FileInterceptor('file'))
    UploadedFile(@UploadedFile() file) {
        // 这里的 file 已经是保存后的文件信息了，在此处做数据库处理，或者直接返回保存后的文件信息

        return {
            ...file,
            url: 'http://localhost:3001/' + file.path
        }
    }
}
