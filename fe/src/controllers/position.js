import PositionView from '../views/position.art';
import PositionAddView from '../views/position-add.art';
import PositionEditView from '../views/position-edit.art';
import _ from 'loadsh';


function getListData(current, res) {
    $.ajax({
        url: '/api/positions/list',
        method: 'POST',
        data: {
            start: current * 10,
            size: 10
        },
        success({msg,data}) {
            if (msg === 'success') {
                res.render(PositionView({
                    list: data.list,
                    total: data.total,
                    pageCount: _.range(data.pageCount),
                }));
            }
        }
   }) 
}
export default {
    async render(req, res, next) {
        getListData(0, res);
        $('#add_position_btn').on('click',  () =>  {
            res.go('/position_add')
        })
        $('.btn-update').on('click', function() {
            res.go('/position_edit', {
                id: $(this).attr('data-id')
            })
        })
        $('#router-view').on('click', "#pagination li[data-index]", function () {
            // 获取当前点击的页码
            let current = $(this).attr('data-index');
            getListData(current, res);
        })
        $('.btn-delete').on('click', function () {
            let id = $(this).attr('data-id')
            $.ajax({
                url: '/api/positions/deleteOne',
                type: 'delete',
                data: {
                    id
                },
                success({msg}) {
                    if (msg === 'success') {
                        alert('删除成功')
                        res.redirect(`/position?time=${new Date().getTime}`)
                    }
                }
            })
        })
    },
    add(req, res, next) {
        res.render(PositionAddView({
            list: []
        }));
        $('#cancel').on('click', () => {
            res.back();
        })
        $('#add-submit').on('click', () => {
            let data = $('#positionForm').serialize()
            $.ajax({
                url: '/api/positions/add',
                type: 'post',
                data,
                success({msg}) {
                    if (msg === 'success') {
                        alert('添加成功')
                        res.go('/position')
                    }
                }
            })
        })
    },
    edit(req, res, next) {
        let id = req.body.id;
        $.ajax({
            url: '/api/positions/getInfoById',
            type: 'post',
            data: {
                id
            },
            success({msg, data}) {
                if (msg === 'success') {
                    res.render(PositionEditView({
                        data
                    }));
                    $('#cancel').on('click', () => {
                        res.back();
                    })
                    $('#add-submit').on('click', () => {
                        let data = $('#positionForm').serialize()
                        $.ajax({
                            url: '/api/positions/edit',
                            type: 'patch',
                            data,
                            success({msg}) {
                                if (msg === 'success') {
                                    alert('编辑成功')
                                    res.go('/position')
                                }
                            }
                        })
                    }) 
                }
            }
        })   
    }
}