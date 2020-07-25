export const formatCount=(count)=>{
    let newData=(count/10000)>10// 大于十万在显示数据代有万字的,否则显示数据
    if(newData){
        return parseInt(count/10000)+'万'
    }else{
        return count
    }
}
export const formatDuration = (duration) => {
    // 转分
    let min = Math.ceil(duration / 1000 / 60)
    min = min < 10 ? '0' + min : min
    // 秒
    let sec = Math.ceil((duration / 1000) % 60)
    sec = sec < 10 ? '0' + sec : sec
    return min + ':' + sec
  }
  