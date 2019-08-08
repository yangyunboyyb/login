// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ribid extends cc.Component {

    ribid: cc.RigidBody

    start () {
        cc.director.getCollisionManager().enabled = true
        this.ribid = this.node.getComponent(cc.RigidBody)
    }

    onCollisionEnter () {
        // this.ribid.linearVelocity = (new cc.Vec2(0, 0))
    }

    onCollisionStay () {
        // this.ribid.linearVelocity = (new cc.Vec2(0, 0))
    }
}
