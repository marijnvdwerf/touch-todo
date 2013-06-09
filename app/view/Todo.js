Ext.define('TouchTodo.view.Todo', {
    extend:'Ext.dataview.component.ListItem',
    requires:[
        'Ext.Button',
        'Ext.field.Checkbox'
    ],
    xtype:'todoItem',

    config:{
        itemCls:'todo',

        checkBox:true,

        labelField:{
            flex:1
        },

        dataMap:{
            getLabelField:{
                setHtml:"label"
            },
            getCheckBox:{
                setChecked: "checked"
            }
        },

        deleteButton:{
            text:"&times;"
        },

        layout:{
            type:'hbox'
        }
    },

    applyCheckBox:function (config) {
        return Ext.factory(config, Ext.field.Checkbox, this.getCheckBox());
    },

    updateCheckBox:function (newLabelField, oldLabelField) {
        if (oldLabelField) {
            this.remove(oldLabelField);
        }
        if (newLabelField) {
            this.add(newLabelField);
        }
    },

    applyLabelField:function (config) {
        return Ext.factory(config, Ext.Component, this.getLabelField());
    },

    updateLabelField:function (newLabelField, oldLabelField) {
        if (oldLabelField) {
            this.remove(oldLabelField);
        }
        if (newLabelField) {
            this.add(newLabelField);
        }
    },

    applyDeleteButton:function (config) {
        return Ext.factory(config, Ext.Button, this.getDeleteButton());
    },

    updateDeleteButton:function (newLabelField, oldLabelField) {
        if (oldLabelField) {
            this.remove(oldLabelField);
        }
        if (newLabelField) {
            this.add(newLabelField);
        }
    }
});