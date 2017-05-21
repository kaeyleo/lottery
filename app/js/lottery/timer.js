class Timer {
    countdown(end, update, handle) {
        const self = this,
              now = new Date().getTime();
        // 如果超出截止时间
        if(now-end) {
            handle.call(self);
        }else{
            let last_time = end - now; // 剩余时间
            // 时间单位
            const px_s = 1000;
            const px_m = px_s * 60;
            const px_h = px_m * 60;
            const px_d = px_h * 24;
            // 剩余时间转换
            let d = Math.floor(last_time/px_d);
            let h = Math.floor((last_time-d*px_d)/px_h);
            let m = Math.floor((last_time-d*px_d-h*px_h)/px_m);
            let s = Math.floor((last_time-d*px_d-h*px_h-m*px_m)/px_s);
            let r = [];
            if(d>0) {
                r.push(`<em>${d}</em>天`);
            }
            if(r.length||(h>0)) {
                r.push(`<em>${h}</em>时`);
            }
            if(r.length||(m>0)) {
                r.push(`<em>${m}</em>分`);
            }
            if(r.length||(s>0)) {
                r.push(`<em>${s}</em>秒`);
            }
            // 拼接输出语句
            self.last_time = r.join('');
            update.call(self, r.join(''));
            // 倒计时
            setTimeout(function(){
                self.countdown(end, update, handle);
            }, 1000);
        }
    }
}

export default Timer;