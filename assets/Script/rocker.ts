import ribid from "./ribid";

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

    @property(cc.Node)
    obstacle: cc.Node = null

    @property()
    speed: number = 0.1

    rocker_p: any
    stick_p: any
    play_p: any

    ribid: cc.RigidBody

    ribid1: cc.RigidBody

    onLoad () {
        if (this.Rocker && this.Rocker.active == true) {
            this.Rocker.active = false
        }
        cc.director.getPhysicsManager().enabled = true

        this.obstacle.getComponent(cc.RigidBody).angularVelocity = 100

        this.ribid = this.play.getComponent(cc.RigidBody)
        
		cc.director.getScheduler().schedule(this.updatePostion, this, 0.05, false)
    }

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START,function(e: { getLocation: () => void; }){
            if (this.Rocker && this.Rocker.active == false) {
                this.Rocker.active = true
                this.stick.position = new cc.Vec2(0,0)
            }
            let w_pos = e.getLocation()
            let pos = this.node.convertToNodeSpaceAR(w_pos)
            this.Rocker.setPosition(pos)
        },this)
   
        this.node.on(cc.Node.EventType.TOUCH_MOVE,function(e: any){
            let touch_p = this.node.convertToNodeSpaceAR(e.getLocation())
            let p = this.rocker_p
            if (p.x == 0 && p.y == 0) {
                return
            }
	
			let x = touch_p.x - p.x
			let y = touch_p.y - p.y
			
			let len = x * x + y * y
			if (len > this.Max_r * this.Max_r) {
				touch_p.x = x / Math.sqrt(len) * this.Max_r
				touch_p.y = y / Math.sqrt(len) * this.Max_r
			}else {
                touch_p.x = x
                touch_p.y = y
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

        if (this.stick_p.x == 0 && this.stick_p.y == 0) {
            this.ribid.linearVelocity = (new cc.Vec2(0, 0))
            return
        }

		if (this.Rocker.active == true) {
            let s = this.stick_p
            let len = s.x * s.x + s.y * s.y
            if (len < this.Max_r * this.Max_r) {
                s.x = (s.x / Math.sqrt(len)) * this.Max_r
                s.y = (s.y / Math.sqrt(len)) * this.Max_r
            }
			s.x += s.x * this.speed
            s.y += s.y * this.speed
            if (s.x == NaN || s.y == NaN) { 
                s.x = 0
                s.y = 0
            }
            this.ribid.linearVelocity = (s)
        } else {
            this.ribid.linearVelocity = (new cc.Vec2(0, 0))
        } 
    }
}
