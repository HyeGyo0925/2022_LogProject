//뷰에 대한 설정(웹팩)을 하기 위한 환경설정 파일

module.exports = {
    devServer:{
        proxy:{
            "/api":{
                target:"http://localhost:3000",
                changeOrigin: true
            }
        }
    }
}