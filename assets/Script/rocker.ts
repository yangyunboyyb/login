import { toUnicode } from "punycode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class rocker extends cc.Component {
    @property(cc.Node)
    stick: cc.Node = null

    @property(cc.Node)
    Rocker: cc.Node = null

    @property(Number)
    Max_r: number = 40

    @property(cc.Node)
    play: cc.Node = null

    @property()
    speed: number = 0.1

    rocker_p: any
    stick_p: any
    play_p: any

    onLoad () {
        if (this.Rocker && this.Rocker.active == true) {
            this.Rocker.active = false
        }

        this.rocker_p = this.Rocker.position
        this.stick_p = this.node.convertToNodeSpaceAR(this.Rocker.position)
        this.play_p = this.play.position
    }

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START,function(e: { getLocation: () => void; }){
            if (this.Rocker && this.Rocker.active == false) {
                this.Rocker.active = true
            }
            let w_pos = e.getLocation()
            let pos = this.node.convertToNodeSpaceAR(w_pos)
            this.Rocker.setPosition(pos)
        },this)
   
        this.node.on(cc.Node.EventType.TOUCH_MOVE,function(e: any){
            let touch_p = this.node.convertToNodeSpaceAR(e.getLocation())

            console.log(touch_p)
            
            if (touch_p.x == NaN || touch_p.y == NaN || this.Rocker.x == NaN || this.Rocker.y == NaN) {
                return
            }
            //  180 145  227 215
            let k = Math.abs(touch_p.y - this.Rocker.y) / (touch_p.x - this.Rocker.x)
            let a = touch_p
            a.x  = (Math.sqrt(1 / (k * k + 1)) + this.Rocker.x)
            a.y = (k * Math.sqrt(1 / (k * k + 1)) + this.Rocker.y)
            console.log(this.rocker_p)

            

            console.log(a)

            this.stick.setPosition(a)
        },this);
   
        this.node.on(cc.Node.EventType.TOUCH_END,function(e: any){
           if (this.Rocker && this.Rocker.active == true) {
               this.Rocker.active = false
           }
        },this);
    }

    update () {
        this.rocker_p = this.Rocker.position
        this.stick_p = this.node.convertToNodeSpaceAR(this.Rocker.position)
        this.play_p = this.node.convertToNodeSpaceAR(this.play.position)
        // if (Math.abs(rocker_p.x - stick_p.x) < 1 || Math.abs(rocker_p.y - stick_p.y) < 1) {
        //     return 
        // }

        // let x = stick_p.x - rocker_p.x
        // let y = stick_p.y - rocker_p.y
        // let p_x = play_p.x + x * this.speed
        // let p_y = play_p.y + y * this.speed

        // this.play.setPosition(new cc.Vec2(p_x,p_y))
    }
}
