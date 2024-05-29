var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// src/Shared/http/server.ts
var import_reflect_metadata3 = require("reflect-metadata");

// src/Shared/container/index.ts
var import_tsyringe = require("tsyringe");

// src/Modules/Tags/repositories/implements/TagsRepository.ts
var import_typeorm2 = require("typeorm");

// src/Modules/Tags/entities/Tags.ts
var import_typeorm = require("typeorm");
var import_uuid = require("uuid");
var Tags = class {
  constructor() {
    if (!this.id) {
      this.id = (0, import_uuid.v4)();
    }
  }
};
__decorateClass([
  (0, import_typeorm.PrimaryColumn)()
], Tags.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm.Column)()
], Tags.prototype, "name", 2);
Tags = __decorateClass([
  (0, import_typeorm.Entity)("tags")
], Tags);

// src/Modules/Tags/repositories/implements/TagsRepository.ts
var TagRepository = class {
  constructor() {
    this.repository = (0, import_typeorm2.getRepository)(Tags);
  }
  async delete(name) {
    await this.repository.delete({ name });
  }
  findById(id) {
    throw new Error("Method not implemented.");
  }
  async findByName(name) {
    return await this.repository.findOne({ name });
  }
  async create(name) {
    const tag = this.repository.create({ name });
    await this.repository.save(tag);
    return tag;
  }
  /*  async findById(id: string): Promise<Tags> {
       return await this.repository.findOne({id})
   } */
  async updateTag(id, name) {
    await this.repository.createQueryBuilder().update().set({ name }).where("id = :id").setParameters({ id }).execute();
  }
};

// src/Modules/Members/repositories/implements/MembersRepository.ts
var import_typeorm4 = require("typeorm");

// src/Modules/Members/entities/Members.ts
var import_typeorm3 = require("typeorm");
var import_uuid2 = require("uuid");
var Members = class {
  constructor() {
    if (!this.id) {
      this.id = (0, import_uuid2.v4)();
      this.isPro = false;
    }
  }
};
__decorateClass([
  (0, import_typeorm3.PrimaryColumn)()
], Members.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm3.Column)()
], Members.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm3.Column)()
], Members.prototype, "email", 2);
__decorateClass([
  (0, import_typeorm3.Column)()
], Members.prototype, "password", 2);
__decorateClass([
  (0, import_typeorm3.Column)()
], Members.prototype, "isPro", 2);
__decorateClass([
  (0, import_typeorm3.CreateDateColumn)()
], Members.prototype, "created_at", 2);
Members = __decorateClass([
  (0, import_typeorm3.Entity)("members")
], Members);

// src/Modules/Members/repositories/implements/MembersRepository.ts
var MembersRepository = class {
  constructor() {
    this.repository = (0, import_typeorm4.getRepository)(Members);
  }
  async create({ name, email, password }) {
    const member = this.repository.create({
      name,
      email,
      password
    });
    await this.repository.save(member);
    return member;
  }
  async delete(id) {
    await this.repository.delete({ id });
  }
  findById(id) {
    throw new Error("Method not implemented.");
  }
  async findByEmail(email) {
    return await this.repository.findOne({ email });
  }
};

// src/Modules/Admins/repository/implements/AdminsRepository.ts
var import_typeorm6 = require("typeorm");

// src/Modules/Admins/entity/Admins.ts
var import_typeorm5 = require("typeorm");
var import_uuid3 = require("uuid");
var Admins = class {
  constructor() {
    if (!this.id) {
      this.id = (0, import_uuid3.v4)();
      this.admin_pro = false;
    }
  }
};
__decorateClass([
  (0, import_typeorm5.PrimaryColumn)()
], Admins.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm5.Column)()
], Admins.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm5.Column)()
], Admins.prototype, "cellphone", 2);
__decorateClass([
  (0, import_typeorm5.Column)()
], Admins.prototype, "email", 2);
__decorateClass([
  (0, import_typeorm5.Column)()
], Admins.prototype, "password", 2);
__decorateClass([
  (0, import_typeorm5.Column)()
], Admins.prototype, "admin_pro", 2);
__decorateClass([
  (0, import_typeorm5.CreateDateColumn)()
], Admins.prototype, "created_at", 2);
Admins = __decorateClass([
  (0, import_typeorm5.Entity)("admins")
], Admins);

// src/Modules/Admins/repository/implements/AdminsRepository.ts
var AdminRepository = class {
  constructor() {
    this.repository = (0, import_typeorm6.getRepository)(Admins);
  }
  async create({ name, cellphone, email, password }) {
    const admin = this.repository.create({
      name,
      email,
      password,
      cellphone
    });
    await this.repository.save(admin);
    return admin;
  }
  async findById(id) {
    return await this.repository.findOne({ id });
  }
  upgradeToPro(id) {
    throw new Error("Method not implemented.");
  }
  async findByEmail(email) {
    return await this.repository.findOne({ email });
  }
  async delete(id) {
    await this.repository.delete({ id });
  }
};

// src/Shared/container/index.ts
import_tsyringe.container.registerSingleton(
  "TagRepository",
  TagRepository
);
import_tsyringe.container.registerSingleton(
  "MembersRepository",
  MembersRepository
);
import_tsyringe.container.registerSingleton(
  "AdminsRepository",
  AdminRepository
);

// src/Shared/http/app.ts
var import_reflect_metadata2 = require("reflect-metadata");

// src/Shared/TypeOrm/data-source.ts
var import_reflect_metadata = require("reflect-metadata");
var import_typeorm7 = require("typeorm");
var data_source_default = async (host = "database_modacad") => {
  const defaultOptions = await (0, import_typeorm7.getConnectionOptions)();
  return (0, import_typeorm7.createConnection)(
    Object.assign(defaultOptions, {
      host,
      entities: [
        Tags,
        Members,
        Admins
      ]
    })
  );
};

// src/Shared/http/app.ts
var import_express5 = __toESM(require("express"));

// src/Shared/http/Routes/index.ts
var import_express4 = require("express");

// src/Shared/http/Routes/tagRoutes.routes.ts
var import_express = require("express");

// src/Modules/Tags/useCases/createTag/createTagController.ts
var import_tsyringe3 = require("tsyringe");

// src/Modules/Tags/useCases/createTag/createTagUseCase.ts
var import_tsyringe2 = require("tsyringe");
var CreateTagUseCase = class {
  constructor(TagsRepository) {
    this.TagsRepository = TagsRepository;
  }
  async execute({ name }) {
    const tagExists = await this.TagsRepository.findByName(name);
    if (tagExists) {
      throw new Error("This tag already exists").message;
    }
    const tag = await this.TagsRepository.create(name);
    return tag;
  }
};
CreateTagUseCase = __decorateClass([
  (0, import_tsyringe2.injectable)(),
  __decorateParam(0, (0, import_tsyringe2.inject)("TagRepository"))
], CreateTagUseCase);

// src/Modules/Tags/useCases/createTag/createTagController.ts
var CreateTagController = class {
  async handle(request, response) {
    const { name } = request.body;
    const createTagUseCase = import_tsyringe3.container.resolve(CreateTagUseCase);
    try {
      const tag = await createTagUseCase.execute({
        name
      });
      return response.status(201).json(tag);
    } catch (error) {
      return response.status(400).json(error);
    }
  }
};

// src/Modules/Tags/useCases/deleteTag/deleteTagController.ts
var import_tsyringe5 = require("tsyringe");

// src/Modules/Tags/useCases/deleteTag/deleteTagUseCase.ts
var import_tsyringe4 = require("tsyringe");
var DeleteTagUseCase = class {
  constructor(tagRepository) {
    this.tagRepository = tagRepository;
  }
  async execute({ name }) {
    const tagExists = await this.tagRepository.findByName(name);
    if (!tagExists) {
      throw new Error("This tag does not exists").message;
    }
    await this.tagRepository.delete(name);
  }
};
DeleteTagUseCase = __decorateClass([
  (0, import_tsyringe4.injectable)(),
  __decorateParam(0, (0, import_tsyringe4.inject)("TagRepository"))
], DeleteTagUseCase);

// src/Modules/Tags/useCases/deleteTag/deleteTagController.ts
var DeleteTagController = class {
  async handle(request, response) {
    const { name } = request.body;
    const deleteTagUseCase = import_tsyringe5.container.resolve(DeleteTagUseCase);
    try {
      const tag = await deleteTagUseCase.execute({
        name
      });
      return response.status(200).send();
    } catch (error) {
      return response.status(400).json(error);
    }
  }
};

// src/Shared/http/Routes/tagRoutes.routes.ts
var tagRoutes = (0, import_express.Router)();
var createTagController = new CreateTagController();
var deleteTagController = new DeleteTagController();
tagRoutes.get("/", (request, response) => {
  return console.log("Tag router");
});
tagRoutes.post("/", createTagController.handle);
tagRoutes.delete("/", deleteTagController.handle);

// src/Shared/http/Routes/memberRoutes.routes.ts
var import_express2 = require("express");

// src/Modules/Members/useCases/createMember/createMemberController.ts
var import_tsyringe7 = require("tsyringe");

// src/Modules/Members/useCases/createMember/createMemberUseCase.ts
var import_bcryptjs = require("bcryptjs");
var import_tsyringe6 = require("tsyringe");
var CreateMemberUseCase = class {
  constructor(memberRepository) {
    this.memberRepository = memberRepository;
  }
  async execute({
    name,
    email,
    password
  }) {
    const memberExists = await this.memberRepository.findByEmail(email);
    if (memberExists) {
      throw new Error("This email already exists!").message;
    }
    const passwordB = await (0, import_bcryptjs.hash)(password, 8);
    const member = await this.memberRepository.create({
      name,
      email,
      password: passwordB
    });
    return member;
  }
};
CreateMemberUseCase = __decorateClass([
  (0, import_tsyringe6.injectable)(),
  __decorateParam(0, (0, import_tsyringe6.inject)("MembersRepository"))
], CreateMemberUseCase);

// src/Modules/Members/useCases/createMember/createMemberController.ts
var CreateMemberController = class {
  async handle(request, response) {
    const {
      name,
      email,
      password
    } = request.body;
    const createMemberUseCase = import_tsyringe7.container.resolve(CreateMemberUseCase);
    try {
      const member = await createMemberUseCase.execute({ name, email, password });
      return response.status(201).json(member);
    } catch (error) {
      return response.json(error);
    }
  }
};

// src/Shared/http/Routes/memberRoutes.routes.ts
var memberRoutes = (0, import_express2.Router)();
var createMemberController = new CreateMemberController();
memberRoutes.post("/", createMemberController.handle);
memberRoutes.delete("/:id", () => {
  console.log("delete member route working");
});

// src/Shared/http/Routes/adminRoutes.routes.ts
var import_express3 = require("express");

// src/Modules/Admins/useCases/createAdmUseCase/createAdmController.ts
var import_tsyringe9 = require("tsyringe");

// src/Modules/Admins/useCases/createAdmUseCase/createAdmUseCase.ts
var import_tsyringe8 = require("tsyringe");
var import_bcryptjs2 = require("bcryptjs");
var CreateAdmUseCase = class {
  constructor(adminsRepository) {
    this.adminsRepository = adminsRepository;
  }
  async execute({
    name,
    email,
    password,
    cellphone
  }) {
    const adminExists = await this.adminsRepository.findByEmail(email);
    if (adminExists) {
      throw new Error("This admin account already exists!").message;
    }
    const passwordCrypt = await (0, import_bcryptjs2.hash)(password, 8);
    const admin = await this.adminsRepository.create({
      name,
      email,
      password: passwordCrypt,
      cellphone
    });
    return admin;
  }
};
CreateAdmUseCase = __decorateClass([
  (0, import_tsyringe8.injectable)(),
  __decorateParam(0, (0, import_tsyringe8.inject)("AdminsRepository"))
], CreateAdmUseCase);

// src/Modules/Admins/useCases/createAdmUseCase/createAdmController.ts
var CreateAdmController = class {
  async handle(request, response) {
    const {
      name,
      email,
      password,
      cellphone
    } = request.body;
    const createAdminUseCase = import_tsyringe9.container.resolve(CreateAdmUseCase);
    try {
      const admin = await createAdminUseCase.execute({ name, email, password, cellphone });
      return response.status(201).json(admin);
    } catch (error) {
      return response.status(400).json(error);
    }
  }
};

// src/Modules/Admins/useCases/authenticate/createSessionAdminController.ts
var import_tsyringe11 = require("tsyringe");

// src/Modules/Admins/useCases/authenticate/createSessionAdminUseCase.ts
var import_bcryptjs3 = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");
var import_tsyringe10 = require("tsyringe");
var CreateSessionAdminUseCase = class {
  constructor(adminRepo) {
    this.adminRepo = adminRepo;
  }
  async execute(email, password) {
    const user = await this.adminRepo.findByEmail(email);
    if (!user) {
      throw new Error("E-mail or password invalid").message;
    }
    const passwordMatch = await (0, import_bcryptjs3.compare)(password, user.password);
    if (!passwordMatch) {
      throw new Error("E-mail or password invalid").message;
    }
    const token = (0, import_jsonwebtoken.sign)({}, "88f1c14bd2a14b42fad21d64739889e9", {
      subject: user.id,
      expiresIn: "1d"
    });
    const tokenResponse = {
      user: {
        name: user.name,
        id: user.id
      },
      token
    };
    return tokenResponse;
  }
};
CreateSessionAdminUseCase = __decorateClass([
  (0, import_tsyringe10.injectable)(),
  __decorateParam(0, (0, import_tsyringe10.inject)("AdminsRepository"))
], CreateSessionAdminUseCase);

// src/Modules/Admins/useCases/authenticate/createSessionAdminController.ts
var CreateSessionAdminController = class {
  async handle(request, response) {
    const { email, password } = request.body;
    const sessionUserUseCase = import_tsyringe11.container.resolve(CreateSessionAdminUseCase);
    try {
      const user = await sessionUserUseCase.execute(email, password);
      return response.status(201).json(user);
    } catch (error) {
      return response.status(404).json(error);
    }
  }
};

// src/Shared/http/Routes/adminRoutes.routes.ts
var adminRoute = (0, import_express3.Router)();
var createAdmController = new CreateAdmController();
var createSessionsAdmController = new CreateSessionAdminController();
adminRoute.post("/", createAdmController.handle);
adminRoute.post("/authenticate", createSessionsAdmController.handle);
adminRoute.delete("/:id", () => {
  console.log("delete member route working");
});

// src/Shared/http/Routes/index.ts
var routes = (0, import_express4.Router)();
routes.use("/tags", tagRoutes);
routes.use("/members", memberRoutes);
routes.use("/admins", adminRoute);

// src/Shared/http/app.ts
data_source_default();
var app = (0, import_express5.default)();
app.use(import_express5.default.json());
app.use(routes);

// src/Shared/http/server.ts
app.listen(3333, () => {
  console.log("server is running!");
});
