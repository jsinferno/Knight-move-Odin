function include(arr, value) {
    const stringifiedValue = JSON.stringify(value);
    if (JSON.stringify(arr).includes(JSON.stringify(value))) return true;
    return false;
  }

class Position{
    constructor(pos){
        this.pos = pos;
    }

    createPos(){
        let newpos = []
        const pos = this.pos
        for (let i = -2; i<3; i+=4){
            newpos.push([pos[0]+i,pos[1]-1])
            newpos.push([pos[0]+i,pos[1]+1])
        }
        for (let i = -1; i<2; i+=2){
            newpos.push([pos[0]+i,pos[1]-2])
            newpos.push([pos[0]+i,pos[1]+2])
        }
        newpos = newpos.filter((item) => {return (9 > item[0] && item[0] > -1 && 9 > item[1] && item[1] > -1)})
        this.pos = newpos;
        return newpos;
    }
}

let queue = []
let done = []
function findMoves(ori,dest){
    let knight = new Position(ori)

    knight.createPos().forEach((ele) => {
        if(!include(queue,ele) && !include(done,ele)) {
            queue.push(ele)
            done.push(ele)
        }
      })

    if (include(knight.pos, dest)) return [ori,dest]
    const ans = findMoves(queue.shift(),dest)
    
    if (include(knight.pos,ans[0])) return [ori,...ans]

    return [...ans]
}

for (let i = 1; i<9; i++){
    $(".square:first").clone().appendTo(".row")
}

for (let i = 1; i<9; i++){
    $(".row:first").clone().appendTo(".table")
}








let ori = undefined
let dest = undefined
let old = undefined
let margin = ($(".table").css("margin").split(" ").join("").split("px").slice(0,2))
let squareSize = $(".square").width()
let finished = false

$(window).resize(function(){
    margin = ($(".table").css("margin").split(" ").join("").split("px").slice(0,2))
    squareSize = $(".square").width()

    
    if (finished){
        $(".knight").css({top: Number(margin[0]) + squareSize*old[0]})
        $(".knight").css({left: Number(margin[1]) + squareSize*old[1]})        
}})

$(".knight").hide()

$("button:first").click(function(){
    $(".knight").hide()

        $(".square").each(function() {
            $(this).html("")
            $(this).addClass("hovering")
            $(this).click(function(){
                ori = [$(this).parent().index(),$(this).index()]
                $(".square").removeClass("hovering")
                $(".square").off() 
                $(this).html("S") 
                    
            })
        })
        $("button:eq(1)").click(function(){
            $(".square").each(function() {
                $(this).addClass("hovering")
                $(this).click(function(){
                    if (dest == undefined){
                    dest = [$(this).parent().index(),$(this).index()]
                    $(".square").removeClass("hovering")
                    $(".square").off()
                    $(this).html("E")                  
                    $(this).off()
                    }

            })
        })
    })}
    
)

$("button:last").click(() => {

    if (ori != undefined && dest != undefined){
        finished = false
        $("button:eq(1)").off()
        const knight = $(".knight")
        let i = 0
        let mylist = findMoves(ori, dest)
        knight.css({top: Number(margin[0]) + squareSize*mylist[0][0]})
        knight.css({left: Number(margin[1]) + squareSize*mylist[0][1]})
        knight.show()
        

        mylist.slice(1).forEach(function(ele){
            setTimeout(() => {
                margin = ($(".table").css("margin").split(" ").join("").split("px").slice(0,2))
                squareSize = $(".square").width()
                knight.css({top: Number(margin[0]) + squareSize*ele[0]})
                knight.css({left: Number(margin[1]) + squareSize*ele[1]}) 
                if (ele == mylist.at(-1)) {finished = true}       
            }, i*2100)
            i++
            $('.table').children('.row')[ele[0]].children[ele[1]].innerText = `${i}`
        })        
        }
        queue = []
        old = dest.slice();
        done = []
        ori = undefined
        dest = undefined
        
        
})

