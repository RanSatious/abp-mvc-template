define(['main', 'app/admin/organizationModal', 'jstree'], function(main, modal) {
  var _service = abp.services.app.organizationUnit;

  var organizationTree = {
    $tree: $('.organization-container'),
    show: function() {
      organizationTree.$tree.show();
    },

    hide: function() {
      organizationTree.$tree.hide();
    },

    unitCount: 0,

    setUnitCount: function(unitCount) {
      organizationTree.unitCount = unitCount;
      if (unitCount) {
        organizationTree.show();
      } else {
        organizationTree.hide();
      }
    },

    refreshUnitCount: function() {
      organizationTree.setUnitCount(organizationTree.$tree.jstree('get_json').length);
    },

    selectedOu: {
      id: null,
      displayName: null,
      code: null,

      set: function(ouInTree) {
        if (!ouInTree) {
          organizationTree.selectedOu.id = null;
          organizationTree.selectedOu.displayName = null;
          organizationTree.selectedOu.code = null;
        } else {
          organizationTree.selectedOu.id = ouInTree.id;
          organizationTree.selectedOu.displayName = ouInTree.original.displayName;
          organizationTree.selectedOu.code = ouInTree.original.code;
        }
      }
    },

    contextMenu: function(node) {
      var items = {
        editUnit: {
          label: '编辑',
          action: function(data) {
            var instance = $.jstree.reference(data.reference);
            modal.edit(node.original, function(organizationUnit) {
              abp.notify.success('保存成功');
              node.original.displayName = organizationUnit.displayName;
              instance.set_text(node, organizationUnit.displayName);
            });
          }
        },
        addSubUnit: {
          label: '添加子部门',
          action: function() {
            organizationTree.addUnit(node.id);
          }
        },

        delete: {
          label: '删除',
          action: function(data) {
            var instance = $.jstree.reference(data.reference);

            abp.message.confirm('是否删除部门：' + node.original.displayName + '？').then(function(result) {
              if (!result) return;

              _service.deleteOrganizationUnit(node.original.id).done(function() {
                abp.notify.success('成功');
                instance.delete_node(node);
              });
            });
          }
        }
      };

      return items;
    },

    addUnit: function(parentId) {
      var instance = $.jstree.reference(organizationTree.$tree);
      modal.create(parentId, function(result) {
        abp.notify.success('添加成功');
        instance.create_node(parentId ? instance.get_node(parentId) : '#', {
          id: result.id,
          parent: result.parentId ? result.parentId : '#',
          code: result.code,
          displayName: result.displayName,
          memberCount: 0,
          text: result.displayName,
          state: {
            opened: true
          }
        });
      });
    },

    getTreeDataFromServer: function(callback) {
      _service.getOrganizationUnits({}).done(function(result) {
        var treeData = result.items.map(function(item) {
          return {
            id: item.id,
            parent: item.parentId ? item.parentId : '#',
            code: item.code,
            displayName: item.displayName,
            memberCount: item.memberCount,
            text: item.displayName,
            state: {
              opened: true
            }
          };
        });

        callback(treeData);
      });
    },

    init: function() {
      organizationTree.getTreeDataFromServer(function(treeData) {
        organizationTree.setUnitCount(treeData.length);

        organizationTree.$tree.jstree({
          core: {
            data: treeData,
            multiple: false,
            check_callback: function(operation, node, node_parent, node_position, more) {
              return true;
            }
          },
          contextmenu: {
            items: organizationTree.contextMenu
          },
          sort: function(node1, node2) {
            return this.get_node(node1).original.code - this.get_node(node2).original.code;
          },
          plugins: ['contextmenu']
        });

        $('#btn-add').click(function() {
          organizationTree.addUnit(null);
        });

        organizationTree.$tree.on('click', '.ou-text .fa-caret-down', function(e) {
          e.preventDefault();

          var ouId = $(this)
            .closest('.ou-text')
            .attr('data-ou-id');
          setTimeout(function() {
            organizationTree.$tree.jstree('show_contextmenu', ouId);
          }, 100);
        });
      });
    },

    reload: function() {
      organizationTree.getTreeDataFromServer(function(treeData) {
        organizationTree.setUnitCount(treeData.length);
        organizationTree.$tree.jstree(true).settings.core.data = treeData;
        organizationTree.$tree.jstree('refresh');
      });
    }
  };

  organizationTree.init();
});
