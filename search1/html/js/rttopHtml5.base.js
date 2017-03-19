var rttophtml5mobi = {
     author: 'qq',
    version: '1.0',
    website: '192.168.2.102'
}
rttophtml5mobi.utils = {
    setParam: function(name, value) {
        localStorage.setItem(name, value)
    },
    getParam: function(name) {
        return localStorage.getItem(name)
    }
}
