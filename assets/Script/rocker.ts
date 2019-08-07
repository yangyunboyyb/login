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

		cc.director.getScheduler().schedule(this.updatePostion, this, 0.05, false)
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
			let p = this.rocker_p
			
			let x = touch_p.x - p.x
			let y = touch_p.y - p.y
			
			let len = x * x + y * y
			if (len > this.Max_r * this.Max_r) {
				touch_p.x = x / Math.sqrt(len) * this.Max_r
				touch_p.y = y / Math.sqrt(len) * this.Max_r
			}

            this.stick.setPosition(touch_p)
        },this);
   
        this.node.on(cc.Node.EventType.TOUCH_END,function(e: any){
           if (this.Rocker && this.Rocker.active == true) {
               this.Rocker.active = false
           }
        },this);
    }

    updatePostion () {
        this.rocker_p = this.Rocker.position
        this.stick_p = this.stick.position
        this.play_p = this.play.position
        
		if (this.Rocker.active == true) {
			let s = this.stick_p
			let p = this.play_p
			p.x += s.x * this.speed
			p.y += s.y * this.speed
			//console.log(s.x,s.y)
			this.play.setPosition(p)
		}  
    }
}
