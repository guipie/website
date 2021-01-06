<!--
*Author：jxx
 *Contact：283591387@qq.com
 *代码由框架生成,任何更改都可能导致被代码生成器覆盖
 *业务请在@/extension/User/Sys_user_follow.js此处编写
 -->
<template>
    <div>
        <view-grid :columns="columns"
                   :detail="detail"
                   :editFormFileds="editFormFileds"
                   :editFormOptions="editFormOptions"
                   :searchFormFileds="searchFormFileds"
                   :searchFormOptions="searchFormOptions"
                   :table="table"
                   :extend="extend">
        </view-grid>
    </div>
</template>

<script>
    import extend from "@/extension/User/Sys_user_follow.js";
    import ViewGrid from "@/components/basic/ViewGrid.vue";
    var vueParam = {
        components: {
            ViewGrid
        },
        data() {
            return {
                table: {
                    key: 'Id',
                    footer: "Foots",
                    cnName: '用户关注',
                    name: 'Sys_user_follow',
                    url: "/Sys_user_follow/",
                    sortName: "Id"
                },
                extend: extend,
                editFormFileds: {},
                editFormOptions: [],
                searchFormFileds: {},
                searchFormOptions: [],
                columns: [{field:'Id',title:'Id',type:'int',width:90,hidden:true,readonly:true,require:true,align:'left'},
                       {field:'FollowUserId',title:'FollowUserId',type:'int',width:90,align:'left',sortable:true},
                       {field:'CreateDate',title:'CreateDate',type:'datetime',width:90,require:true,align:'left',sortable:true},
                       {field:'CreateID',title:'CreateID',type:'int',width:80,hidden:true,require:true,align:'left'},
                       {field:'Creator',title:'Creator',type:'string',width:130,require:true,align:'left'}],
                detail: {
                    cnName:"#detailCnName",
                    columns: [],
                    sortName: "",
                    key:""
                }
            };
        }
    };
    export default vueParam;
</script>
