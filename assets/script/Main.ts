/*
 * @Author: dgflash
 * @Date: 2021-07-03 16:13:17
 * @LastEditors: dgflash
 * @LastEditTime: 2023-01-19 15:28:28
 */
import { DynamicAtlasManager, _decorator, macro, profiler } from 'cc';
import { DEBUG, JSB } from 'cc/env';
import { oops } from '../../extensions/oops-plugin-framework/assets/core/Oops';
import { Root } from '../../extensions/oops-plugin-framework/assets/core/Root';
import { ecs } from '../../extensions/oops-plugin-framework/assets/libs/ecs/ECS';
import { UIConfigData } from './game/common/config/GameUIConfig';
import { smc } from './game/common/ecs/SingletonModuleComp';
import { EcsPositionSystem } from './game/common/ecs/position/EcsPositionSystem';
import { Initialize } from './game/initialize/Initialize';
import { HttpManager } from './net/HttpManager';

const { ccclass, property } = _decorator;

macro.CLEANUP_IMAGE_CACHE = false;
DynamicAtlasManager.instance.enabled = true;
DynamicAtlasManager.instance.maxFrameSize = 512;

@ccclass('Main')
export class Main extends Root {
    start() {
        this.testHttp();
        if (DEBUG) profiler.showStats();
    }
    async testHttp() {
        // 免费天气http api接口测试
        var http: HttpManager = new HttpManager();
        http.server = "http://v1.yiketianqi.com/";
        http.timeout = 10000;
        var params: any = {
            'version': 'v9',
            'unescape': 1,
            'appid': 23035354,
            'appsecret': '8YvlPNrz'
        }
        var ret = await http.getJson("api", params);
        if (ret.isSucc) {
            console.log("七日内天气信息", ret.res);
        }
        else {
            console.log(ret.err);
        }
    }


    protected run() {
        smc.initialize = ecs.getEntity<Initialize>(Initialize);
        if (JSB) {
            oops.gui.toast("热更新后新程序的提示");
        }
    }

    protected initGui() {
        oops.gui.init(UIConfigData);
    }

    protected async initEcsSystem() {
        oops.ecs.add(new EcsPositionSystem())
        // oops.ecs.add(new EcsAccountSystem());
        // oops.ecs.add(new EcsRoleSystem());
        // oops.ecs.add(new EcsInitializeSystem());
    }
}