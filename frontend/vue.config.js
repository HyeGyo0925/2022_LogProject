//�信 ���� ����(����)�� �ϱ� ���� ȯ�漳�� ����

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