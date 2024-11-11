/*
 * @Date: 2021-08-12 09:33:37
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-22 18:09:52
 */

import { Logger } from "../../Logger";
import { INetworkTips } from "../NetInterface";
import { netChannel } from "./NetChannelManager";

/** 游戏服务器提示 */
export class NetGameTips implements INetworkTips {
    /** 连接提示 */
    async connectTips(isShow: boolean) {
        if (isShow) {
            Logger.logNet("游戏服务器正在连接");
        }
        else {
            Logger.logNet("游戏服务器连接成功");

            // 连接成功后向服务器发数据
            var ulq = new proto.UserLoginReq();
            ulq.token = "123456";
            ulq.serverId = 8888;
            var ret1 = await netChannel.game.req<proto.UserLoginReq>(proto.Cmd.UserLogin, "UserLoginReq", "UserLoginReq", ulq);
            if (ret1.isSucc) {
                console.log(`收到服务器【${proto.Cmd.UserLogin}】协议返回数据`, ret1.res);          // 处理正常逻辑
            }
            else {
                console.log(`收到服务器【${proto.Cmd.UserLogin}】协议返回错误码`, ret1.err);        // 服务器错误码客户端出对应的提示
            }
        }
    }

    /** 重连接提示 */
    reconnectTips(): void {
        console.log("重连接提示");
    }

    /** 请求提示 */
    requestTips(isShow: boolean): void {
        if (isShow) {
            console.log("有请求处理中");
        }
        else {
            console.log("所有请求结束");
        }
    }

    disconnectTips(isShow: boolean): void {
        console.log("断网", isShow);
    }
}