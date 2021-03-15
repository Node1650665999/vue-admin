/**
 * 时间戳转日期
 * @param time
 * @returns {string|number}
 */
function formatTime(time)
{
    if(! time){
        return 0
    }else{
        let date = null;
        if(isNaN(parseInt(time))){
            date = new Date(time);
        }else{
            date = new Date(time*1000);
        }
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
}

/**
 * json 转 query-param
 * @param json
 * @returns {string}
 */
function httpBuildQuery(json) {
    let tempArr = [];
    for (let i in json) {
        let key   = encodeURIComponent(i);
        let value = encodeURIComponent(json[i]);
        tempArr.push(key + '=' + value);
    }
    return tempArr.join('&');
}

/**
 * 权限列表
 * @returns {*}
 */
function permissionList() {
    let permissionTree = JSON.parse(localStorage.getItem(`${this.$apiDomain}_menu`));
    return expand(permissionTree);
}

/**
 * 权限
 * @param permissionId
 */
function permissionInfo(permissionId) {
    return  this.permissionList().find((item) => {
        return item.id == permissionId;
    });
}

/**
 * 读取权限树
 * @param permissionTree
 * @param arr
 * @returns {*}
 */
function expand(permissionTree, arr=[]) {
    for (let item of permissionTree) {
        let pmsObj = {
            id : item.id,
            depth: item.depth,
            parent_id: item.parent_id,
            name: item.name,
            route: item.route,
            permission: item.permission
        };
        arr.push(pmsObj);
        if (item.children && item.children.length) {
            expand(item.children, arr);
        }
    }
    return arr
}

/**
 * 判断是否拥有某个权限
 * @param permission
 * @returns {*}
 */
function hasPermission(permission='') {
    let permissionList = this.permissionList();
    let pmsArr         = this.arrayColumn(permissionList, 'permission');
    return pmsArr.includes(permission);
}

/**
 * 提取对象数组中的某一列
 * @param objArr
 * @param attr
 * @returns {*}
 */
function arrayColumn (objArr, attr) {
    let  attrList = objArr.map((item)=>{
        return item[attr].trim();
    });
    return attrList;
}

export default {
    formatTime,
    httpBuildQuery,
    permissionList,
    permissionInfo,
    hasPermission,
    arrayColumn
}