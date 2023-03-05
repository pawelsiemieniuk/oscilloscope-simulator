export class Oscilloscope
{
    constructor(ctx, width, height)
    {
        this.ctx = ctx
        this.width = width
        this.height = height

        this.sample_list = new Array(0)
        this.sample_dist = this.width / 1000

        this.x_axis = this.height / 2


        this.resetVoltage()

        this.updateSamples()
    }

    resetVoltage()
    {
        this.voltage = 0
    }

    setInput(in_1, in_2)
    {
        this.voltage = in_1 - in_2
    }

    setSignalType(type)
    {
        this.signal_type = type
    }

    updateSamples()
    {
        if(this.sample_list.length >= 1000)
            this.sample_list.shift()

        this.sample_list.push(this.voltage)

        this.draw()
    }

    draw()
    {
        let len = this.sample_list.length
        let dist = this.sample_dist
        let ctx = this.ctx

        ctx.clearRect(0,0,this.width, this.height)
        
        ctx.beginPath()
        ctx.strokeStyle = "grey"
        ctx.lineWidth = 3
        ctx.moveTo(0, this.height / 2)
        ctx.lineTo(this.width, this.height / 2)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.setLineDash([5,3])
        for(let i = 0; i < 10; i++)
        {
            ctx.moveTo(i * 100 * dist, 0)
            ctx.lineTo(i * 100 * dist, this.height)
        }
        for(let i = 0; i < 15; i++)
        {
            ctx.moveTo(0, 50 + i * 100)
            ctx.lineTo(this.width, 50 + i * 100)
        }

        ctx.stroke()

        ctx.beginPath()
        ctx.setLineDash([])
        ctx.strokeStyle = "green"
        ctx.lineWidth = 3

        for(let i = 0; i < len; i++)
        {
            if(this.signal_type == 'square')
                ctx.lineTo((i-1) * dist, this.x_axis - this.sample_list[i])
            if(i != 0 && Math.abs(this.sample_list[i-1] - this.sample_list[i]) > 2000)
            {
               ctx.moveTo(i * dist, this.x_axis - this.sample_list[i])
            }
            ctx.lineTo(i * dist, this.x_axis - this.sample_list[i])
            
        }

        ctx.stroke()

        ctx.fillStyle = "green"
        ctx.font = "40px Arial"
        ctx.fillText("VOLTS/DIV: 1V", 30,50)
        ctx.fillText("TIME/DIV:    1ms", 30,100)
        
    }
}