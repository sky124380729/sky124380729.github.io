const { Controller } = require('egg');


class ProjectController extends Controller {
  // 项目模板查询
  async index() {
    const { ctx } = this;
    const res = await ctx.model.Project.find({});
    ctx.body = res;
  }
  // 项目模板查询
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await ctx.model.Project.find({ value: id });
    if (res.length > 0) {
      ctx.body = res[0];
    } else {
      ctx.body = {};
    }
  }
  // 项目模板新增
  create() {
    /* const { ctx } = this;
    ctx.model.Project.create({
      name: 'test',
      value: 'test',
    }); */
  }
  // 项目模板更新
  update() {
    const { ctx } = this;
    ctx.body = 'update';
  }
  // 项目模板删除
  destroy() {
    const { ctx } = this;
    ctx.body = 'destroy';
  }
}

module.exports = ProjectController;
