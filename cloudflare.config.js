// Cloudflare Pages 配置文件
module.exports = {
  // 标记表示已修复contentful order参数问题
  contentfulOrderFixed: true,
  
  // 部署配置
  deploymentConfig: {
    buildCommand: 'npm run build',
    buildOutputDirectory: 'out',
    rootDirectory: '',
    nodeVersion: '18.x'
  }
}; 