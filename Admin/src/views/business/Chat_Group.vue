<!--
*Author：jxx
 *Contact：283591387@qq.com
 *代码由框架生成,任何更改都可能导致被代码生成器覆盖
 *业务请在@/extension/business/Chat_Group.js此处编写
 -->
<template>
    <div>
        <view-grid
                   ref="grid"
                   :columns="columns"
                   :detail="detail"
                   :editFormFields="editFormFields"
                   :editFormFileds="editFormFields"
                   :editFormOptions="editFormOptions"
                   :searchFormFields="searchFormFields"
                   :searchFormFileds="searchFormFields"
                   :searchFormOptions="searchFormOptions"
                   :table="table"
                   :extend="extend">
        </view-grid>
    </div>
</template>

<script>
    import extend from "@/extension/business/Chat_Group.js";
    import ViewGrid from "@/components/basic/ViewGrid.vue";
    var vueParam = {
        components: {
            ViewGrid
        },
        data() {
            return {
                table: {
                    key: 'GroupId',
                    footer: "Foots",
                    cnName: '聊天群',
                    name: 'Chat_Group',
                    url: "/Chat_Group/",
                    sortName: "GroupId"
                },
                extend: extend,
                editFormFields: {},
                editFormOptions: [],
                searchFormFields: {},
                searchFormOptions: [],
                columns: [{field:'GroupId',title:'GroupId',type:'int',width:90,hidden:true,readonly:true,require:true,align:'left'},
                       {field:'Name',title:'群名称',type:'string',width:90,require:true,align:'left',sortable:true},
                       {field:'Description',title:'群描述公告',type:'string',width:220,align:'left'},
                       {field:'CreateDate',title:'CreateDate',type:'datetime',width:90,require:true,align:'left',sortable:true},
                       {field:'CreateID',title:'CreateID',type:'int',width:80,hidden:true,require:true,align:'left'},
                       {field:'Creator',title:'Creator',type:'string',width:130,require:true,align:'left'},
                       {field:'Modifier',title:'Modifier',type:'string',width:130,require:true,align:'left'},
                       {field:'ModifyDate',title:'ModifyDate',type:'datetime',width:90,require:true,align:'left',sortable:true},
                       {field:'ModifyID',title:'ModifyID',type:'int',width:80,hidden:true,require:true,align:'left'}],
                detail: {
                    cnName:"群成员",
                    columns: [{field:'MemberId',title:'MemberId',type:'int',width:90,hidden:true,readonly:true,require:true,align:'left'},
                       {field:'GroupId',title:'GroupId',type:'int',width:90,require:true,align:'left',sortable:true},
                       {field:'UserId',title:'UserId',type:'int',width:90,require:true,align:'left'}],
                    sortName: "MemberId",
                    key:"MemberId"
                }
            };
        }
    };
    export default vueParam;
</script>
