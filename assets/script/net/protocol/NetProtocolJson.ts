/*
 * @Author: dgflash
 * @Date: 2022-04-21 13:45:51
 * @LastEditors: dgflash
 * @LastEditTime: 2022-04-21 13:51:33
 */
import { IProtocolHelper, IRequestProtocol, IResponseProtocol } from "../NetInterface";

/** JSON数据协议 */
export class NetProtocolJson extends IProtocolHelper {
    encode(ireqp: IRequestProtocol): void {
        ireqp.id = this.getRequestId();

        var data: any = {};
        data.id = ireqp.id;
        data.cmd = ireqp.cmd;
        data.data = JSON.stringify(ireqp.params);
        ireqp.buffer = JSON.stringify(data);
    }

    decodeCommon(msg: string): IResponseProtocol {
        var json = JSON.parse(msg);
        var ipp: IResponseProtocol = {
            id: json.id,
            cmd: json.cmd,
            code: json.code,
            data: JSON.parse(json.data)
        }
        return ipp;
    }

    decodeCustom(ireqp: IRequestProtocol, iresp: IResponseProtocol): void {

    }

    onHearbeat(): void {

    }
}