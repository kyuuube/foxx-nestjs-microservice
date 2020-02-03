import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { AccountService } from './account.service'
import { TokenRequirementsHelper } from './token-requirements.decorator'

@Injectable()
export class TokenGuard implements CanActivate {
    private logger = new Logger('TokenGuard ✨ ')
    constructor(
        private readonly reflector: Reflector,
        private readonly accountService: AccountService
    ) {}

    public async canActivate(context: ExecutionContext) {
        // check if the decorator is present
        const tokenRequirements = this.reflector.get<TokenRequirementsHelper>(
            'tokenrequirements',
            context.getHandler()
        )
        if (!tokenRequirements) {
            return true
        } else {
            const req = context.switchToHttp().getRequest()
            if (req.headers.authorization) {
                try {
                    // validate token
                    const token = req.headers.authorization
                    const decodedToken = this.accountService.validateAccessToken(
                        token
                    )

                    // check if token is of the right type
                    if (!tokenRequirements.tokenIsOfType(decodedToken.type)) {
                        return false
                    }

                    // save token in request object
                    req.token = decodedToken

                    return true
                } catch (err) {
                    return false
                }
            } else {
                return false
            }
        }
    }
}
