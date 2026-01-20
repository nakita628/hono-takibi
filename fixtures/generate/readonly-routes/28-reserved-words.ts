import { createRoute, z } from '@hono/zod-openapi'

const ClassSchema = z
  .object({
    class: z.string().exactOptional(),
    extends: z.string().exactOptional(),
    implements: z.array(z.string()).exactOptional(),
  })
  .readonly()
  .openapi('Class')

const InterfaceSchema = z
  .object({ name: z.string().exactOptional() })
  .readonly()
  .openapi('Interface')

const TypeSchema = z.object({ type: z.string().exactOptional() }).readonly().openapi('Type')

const FunctionSchema = z
  .object({ name: z.string().exactOptional(), return: z.string().exactOptional() })
  .readonly()
  .openapi('Function')

const EnumSchema = z
  .object({ values: z.array(z.string()).exactOptional() })
  .readonly()
  .openapi('Enum')

const ConstSchema = z.object({ value: z.string().exactOptional() }).readonly().openapi('Const')

const NullSchema = z.object({ isNull: z.boolean().exactOptional() }).readonly().openapi('Null')

const ObjectSchema = z
  .object({ data: z.object({}).exactOptional() })
  .readonly()
  .openapi('Object')

const ArraySchema = z
  .object({ items: z.array(z.string()).exactOptional() })
  .readonly()
  .openapi('Array')

const StringSchema = z.object({ value: z.string().exactOptional() }).readonly().openapi('String')

const NumberSchema = z.object({ value: z.number().exactOptional() }).readonly().openapi('Number')

const BooleanSchema = z.object({ value: z.boolean().exactOptional() }).readonly().openapi('Boolean')

const DateSchema = z
  .object({ timestamp: z.iso.datetime().exactOptional() })
  .readonly()
  .openapi('Date')

const ErrorSchema = z.object({ message: z.string().exactOptional() }).readonly().openapi('Error')

const PromiseSchema = z.object({ status: z.string().exactOptional() }).readonly().openapi('Promise')

const MapSchema = z.record(z.string(), z.string()).readonly().openapi('Map')

const SetSchema = z
  .object({ values: z.array(z.string()).exactOptional() })
  .readonly()
  .openapi('Set')

const UserSchema = z.object({ id: z.int().exactOptional() }).readonly().openapi('User')

const USERSchema = z.object({ id: z.number().exactOptional() }).readonly().openapi('USER')

const MyModelSchema = z.object({ value: z.int().exactOptional() }).readonly().openapi('MyModel')

const MYMODELSchema = z.object({ value: z.boolean().exactOptional() }).readonly().openapi('MYMODEL')

const MymodelSchema = z.object({ value: z.number().exactOptional() }).readonly().openapi('Mymodel')

const ReservedPropertiesSchema = z
  .object({
    class: z.string(),
    type: z.string(),
    default: z.string(),
    null: z.string().exactOptional(),
    true: z.string().exactOptional(),
    false: z.string().exactOptional(),
    if: z.string().exactOptional(),
    else: z.string().exactOptional(),
    for: z.string().exactOptional(),
    while: z.string().exactOptional(),
    do: z.string().exactOptional(),
    switch: z.string().exactOptional(),
    case: z.string().exactOptional(),
    break: z.string().exactOptional(),
    continue: z.string().exactOptional(),
    return: z.string().exactOptional(),
    function: z.string().exactOptional(),
    var: z.string().exactOptional(),
    let: z.string().exactOptional(),
    const: z.string().exactOptional(),
    new: z.string().exactOptional(),
    delete: z.string().exactOptional(),
    typeof: z.string().exactOptional(),
    instanceof: z.string().exactOptional(),
    void: z.string().exactOptional(),
    this: z.string().exactOptional(),
    super: z.string().exactOptional(),
    import: z.string().exactOptional(),
    export: z.string().exactOptional(),
    from: z.string().exactOptional(),
    as: z.string().exactOptional(),
    async: z.string().exactOptional(),
    await: z.string().exactOptional(),
    yield: z.string().exactOptional(),
    try: z.string().exactOptional(),
    catch: z.string().exactOptional(),
    finally: z.string().exactOptional(),
    throw: z.string().exactOptional(),
    extends: z.string().exactOptional(),
    implements: z.string().exactOptional(),
    interface: z.string().exactOptional(),
    package: z.string().exactOptional(),
    private: z.string().exactOptional(),
    protected: z.string().exactOptional(),
    public: z.string().exactOptional(),
    static: z.string().exactOptional(),
    enum: z.string().exactOptional(),
    abstract: z.string().exactOptional(),
    final: z.string().exactOptional(),
    native: z.string().exactOptional(),
    synchronized: z.string().exactOptional(),
    transient: z.string().exactOptional(),
    volatile: z.string().exactOptional(),
    goto: z.string().exactOptional(),
    debugger: z.string().exactOptional(),
    with: z.string().exactOptional(),
    in: z.string().exactOptional(),
    of: z.string().exactOptional(),
    get: z.string().exactOptional(),
    set: z.string().exactOptional(),
    arguments: z.string().exactOptional(),
    eval: z.string().exactOptional(),
    constructor: z.string().exactOptional(),
    prototype: z.string().exactOptional(),
    __proto__: z.string().exactOptional(),
    __defineGetter__: z.string().exactOptional(),
    __defineSetter__: z.string().exactOptional(),
    __lookupGetter__: z.string().exactOptional(),
    __lookupSetter__: z.string().exactOptional(),
    hasOwnProperty: z.string().exactOptional(),
    isPrototypeOf: z.string().exactOptional(),
    propertyIsEnumerable: z.string().exactOptional(),
    toLocaleString: z.string().exactOptional(),
    toString: z.string().exactOptional(),
    valueOf: z.string().exactOptional(),
  })
  .openapi({ required: ['class', 'type', 'default', 'null', 'true', 'false'] })
  .readonly()
  .openapi('ReservedProperties')

const PythonReservedSchema = z
  .object({
    and: z.string().exactOptional(),
    as: z.string().exactOptional(),
    assert: z.string().exactOptional(),
    break: z.string().exactOptional(),
    class: z.string().exactOptional(),
    continue: z.string().exactOptional(),
    def: z.string().exactOptional(),
    del: z.string().exactOptional(),
    elif: z.string().exactOptional(),
    else: z.string().exactOptional(),
    except: z.string().exactOptional(),
    exec: z.string().exactOptional(),
    finally: z.string().exactOptional(),
    for: z.string().exactOptional(),
    from: z.string().exactOptional(),
    global: z.string().exactOptional(),
    if: z.string().exactOptional(),
    import: z.string().exactOptional(),
    in: z.string().exactOptional(),
    is: z.string().exactOptional(),
    lambda: z.string().exactOptional(),
    not: z.string().exactOptional(),
    or: z.string().exactOptional(),
    pass: z.string().exactOptional(),
    print: z.string().exactOptional(),
    raise: z.string().exactOptional(),
    return: z.string().exactOptional(),
    try: z.string().exactOptional(),
    while: z.string().exactOptional(),
    with: z.string().exactOptional(),
    yield: z.string().exactOptional(),
    None: z.string().exactOptional(),
    true: z.string().exactOptional(),
    false: z.string().exactOptional(),
    nonlocal: z.string().exactOptional(),
    async: z.string().exactOptional(),
    await: z.string().exactOptional(),
  })
  .readonly()
  .openapi('PythonReserved')

const GoReservedSchema = z
  .object({
    break: z.string().exactOptional(),
    case: z.string().exactOptional(),
    chan: z.string().exactOptional(),
    const: z.string().exactOptional(),
    continue: z.string().exactOptional(),
    default: z.string().exactOptional(),
    defer: z.string().exactOptional(),
    else: z.string().exactOptional(),
    fallthrough: z.string().exactOptional(),
    for: z.string().exactOptional(),
    func: z.string().exactOptional(),
    go: z.string().exactOptional(),
    goto: z.string().exactOptional(),
    if: z.string().exactOptional(),
    import: z.string().exactOptional(),
    interface: z.string().exactOptional(),
    map: z.string().exactOptional(),
    package: z.string().exactOptional(),
    range: z.string().exactOptional(),
    return: z.string().exactOptional(),
    select: z.string().exactOptional(),
    struct: z.string().exactOptional(),
    switch: z.string().exactOptional(),
    type: z.string().exactOptional(),
    var: z.string().exactOptional(),
  })
  .readonly()
  .openapi('GoReserved')

const RustReservedSchema = z
  .object({
    as: z.string().exactOptional(),
    async: z.string().exactOptional(),
    await: z.string().exactOptional(),
    break: z.string().exactOptional(),
    const: z.string().exactOptional(),
    continue: z.string().exactOptional(),
    crate: z.string().exactOptional(),
    dyn: z.string().exactOptional(),
    else: z.string().exactOptional(),
    enum: z.string().exactOptional(),
    extern: z.string().exactOptional(),
    false: z.string().exactOptional(),
    fn: z.string().exactOptional(),
    for: z.string().exactOptional(),
    if: z.string().exactOptional(),
    impl: z.string().exactOptional(),
    in: z.string().exactOptional(),
    let: z.string().exactOptional(),
    loop: z.string().exactOptional(),
    match: z.string().exactOptional(),
    mod: z.string().exactOptional(),
    move: z.string().exactOptional(),
    mut: z.string().exactOptional(),
    pub: z.string().exactOptional(),
    ref: z.string().exactOptional(),
    return: z.string().exactOptional(),
    self: z.string().exactOptional(),
    Self: z.string().exactOptional(),
    static: z.string().exactOptional(),
    struct: z.string().exactOptional(),
    super: z.string().exactOptional(),
    trait: z.string().exactOptional(),
    true: z.string().exactOptional(),
    type: z.string().exactOptional(),
    unsafe: z.string().exactOptional(),
    use: z.string().exactOptional(),
    where: z.string().exactOptional(),
    while: z.string().exactOptional(),
  })
  .readonly()
  .openapi('RustReserved')

const ClassParamsSchema = z
  .string()
  .exactOptional()
  .openapi({ param: { name: 'class', in: 'query', schema: { type: 'string' } } })
  .readonly()

const TypeParamsSchema = z
  .string()
  .exactOptional()
  .openapi({ param: { name: 'type', in: 'query', schema: { type: 'string' } } })
  .readonly()

const DefaultParamsSchema = z
  .string()
  .exactOptional()
  .openapi({ param: { name: 'default', in: 'query', schema: { type: 'string' } } })
  .readonly()

const NullParamsSchema = z
  .string()
  .exactOptional()
  .openapi({ param: { name: 'null', in: 'query', schema: { type: 'string' } } })
  .readonly()

const TrueParamsSchema = z
  .string()
  .exactOptional()
  .openapi({ param: { name: 'true', in: 'query', schema: { type: 'string' } } })
  .readonly()

const FalseParamsSchema = z
  .string()
  .exactOptional()
  .openapi({ param: { name: 'false', in: 'query', schema: { type: 'string' } } })
  .readonly()

export const getClassRoute = createRoute({
  method: 'get',
  path: '/class',
  operationId: 'class',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ClassSchema } } },
  },
} as const)

export const getInterfaceRoute = createRoute({
  method: 'get',
  path: '/interface',
  operationId: 'interface',
  responses: { 200: { description: 'OK' } },
} as const)

export const getTypeRoute = createRoute({
  method: 'get',
  path: '/type',
  operationId: 'type',
  responses: { 200: { description: 'OK' } },
} as const)

export const postFunctionRoute = createRoute({
  method: 'post',
  path: '/function',
  operationId: 'function',
  responses: { 200: { description: 'OK' } },
} as const)

export const getReturnRoute = createRoute({
  method: 'get',
  path: '/return',
  operationId: 'return',
  responses: { 200: { description: 'OK' } },
} as const)

export const getImportRoute = createRoute({
  method: 'get',
  path: '/import',
  operationId: 'import',
  responses: { 200: { description: 'OK' } },
} as const)

export const getExportRoute = createRoute({
  method: 'get',
  path: '/export',
  operationId: 'export',
  responses: { 200: { description: 'OK' } },
} as const)

export const getDefaultRoute = createRoute({
  method: 'get',
  path: '/default',
  operationId: 'default',
  responses: { 200: { description: 'OK' } },
} as const)

export const postNewRoute = createRoute({
  method: 'post',
  path: '/new',
  operationId: 'new',
  responses: { 200: { description: 'OK' } },
} as const)

export const deleteDeleteRoute = createRoute({
  method: 'delete',
  path: '/delete',
  operationId: 'delete',
  responses: { 200: { description: 'OK' } },
} as const)

export const getVoidRoute = createRoute({
  method: 'get',
  path: '/void',
  operationId: 'void',
  responses: { 200: { description: 'OK' } },
} as const)

export const getNullRoute = createRoute({
  method: 'get',
  path: '/null',
  responses: { 200: { description: 'OK' } },
} as const)

export const getTrueRoute = createRoute({
  method: 'get',
  path: '/true',
  operationId: 'true',
  responses: { 200: { description: 'OK' } },
} as const)

export const getFalseRoute = createRoute({
  method: 'get',
  path: '/false',
  responses: { 200: { description: 'OK' } },
} as const)

export const getIfRoute = createRoute({
  method: 'get',
  path: '/if',
  operationId: 'if',
  responses: { 200: { description: 'OK' } },
} as const)

export const getElseRoute = createRoute({
  method: 'get',
  path: '/else',
  operationId: 'else',
  responses: { 200: { description: 'OK' } },
} as const)

export const getForRoute = createRoute({
  method: 'get',
  path: '/for',
  operationId: 'for',
  responses: { 200: { description: 'OK' } },
} as const)

export const getWhileRoute = createRoute({
  method: 'get',
  path: '/while',
  operationId: 'while',
  responses: { 200: { description: 'OK' } },
} as const)

export const getSwitchRoute = createRoute({
  method: 'get',
  path: '/switch',
  operationId: 'switch',
  responses: { 200: { description: 'OK' } },
} as const)

export const getCaseRoute = createRoute({
  method: 'get',
  path: '/case',
  operationId: 'case',
  responses: { 200: { description: 'OK' } },
} as const)

export const getBreakRoute = createRoute({
  method: 'get',
  path: '/break',
  operationId: 'break',
  responses: { 200: { description: 'OK' } },
} as const)

export const getContinueRoute = createRoute({
  method: 'get',
  path: '/continue',
  operationId: 'continue',
  responses: { 200: { description: 'OK' } },
} as const)

export const getTryRoute = createRoute({
  method: 'get',
  path: '/try',
  operationId: 'try',
  responses: { 200: { description: 'OK' } },
} as const)

export const getCatchRoute = createRoute({
  method: 'get',
  path: '/catch',
  operationId: 'catch',
  responses: { 200: { description: 'OK' } },
} as const)

export const getFinallyRoute = createRoute({
  method: 'get',
  path: '/finally',
  operationId: 'finally',
  responses: { 200: { description: 'OK' } },
} as const)

export const getThrowRoute = createRoute({
  method: 'get',
  path: '/throw',
  operationId: 'throw',
  responses: { 200: { description: 'OK' } },
} as const)

export const getAsyncRoute = createRoute({
  method: 'get',
  path: '/async',
  operationId: 'async',
  responses: { 200: { description: 'OK' } },
} as const)

export const getAwaitRoute = createRoute({
  method: 'get',
  path: '/await',
  operationId: 'await',
  responses: { 200: { description: 'OK' } },
} as const)

export const getYieldRoute = createRoute({
  method: 'get',
  path: '/yield',
  operationId: 'yield',
  responses: { 200: { description: 'OK' } },
} as const)

export const getStaticRoute = createRoute({
  method: 'get',
  path: '/static',
  operationId: 'static',
  responses: { 200: { description: 'OK' } },
} as const)

export const getPublicRoute = createRoute({
  method: 'get',
  path: '/public',
  operationId: 'public',
  responses: { 200: { description: 'OK' } },
} as const)

export const getPrivateRoute = createRoute({
  method: 'get',
  path: '/private',
  operationId: 'private',
  responses: { 200: { description: 'OK' } },
} as const)

export const getProtectedRoute = createRoute({
  method: 'get',
  path: '/protected',
  operationId: 'protected',
  responses: { 200: { description: 'OK' } },
} as const)

export const getAbstractRoute = createRoute({
  method: 'get',
  path: '/abstract',
  operationId: 'abstract',
  responses: { 200: { description: 'OK' } },
} as const)

export const getFinalRoute = createRoute({
  method: 'get',
  path: '/final',
  operationId: 'final',
  responses: { 200: { description: 'OK' } },
} as const)

export const getExtendsRoute = createRoute({
  method: 'get',
  path: '/extends',
  operationId: 'extends',
  responses: { 200: { description: 'OK' } },
} as const)

export const getImplementsRoute = createRoute({
  method: 'get',
  path: '/implements',
  operationId: 'implements',
  responses: { 200: { description: 'OK' } },
} as const)

export const getPackageRoute = createRoute({
  method: 'get',
  path: '/package',
  operationId: 'package',
  responses: { 200: { description: 'OK' } },
} as const)

export const getEnumRoute = createRoute({
  method: 'get',
  path: '/enum',
  operationId: 'enum',
  responses: { 200: { description: 'OK' } },
} as const)

export const getConstRoute = createRoute({
  method: 'get',
  path: '/const',
  operationId: 'const',
  responses: { 200: { description: 'OK' } },
} as const)

export const getLetRoute = createRoute({
  method: 'get',
  path: '/let',
  operationId: 'let',
  responses: { 200: { description: 'OK' } },
} as const)

export const getVarRoute = createRoute({
  method: 'get',
  path: '/var',
  operationId: 'var',
  responses: { 200: { description: 'OK' } },
} as const)

export const getThisRoute = createRoute({
  method: 'get',
  path: '/this',
  operationId: 'this',
  responses: { 200: { description: 'OK' } },
} as const)

export const getSuperRoute = createRoute({
  method: 'get',
  path: '/super',
  operationId: 'super',
  responses: { 200: { description: 'OK' } },
} as const)

export const getSelfRoute = createRoute({
  method: 'get',
  path: '/self',
  operationId: 'self',
  responses: { 200: { description: 'OK' } },
} as const)

export const getConstructorRoute = createRoute({
  method: 'get',
  path: '/constructor',
  operationId: 'constructor',
  responses: { 200: { description: 'OK' } },
} as const)

export const getPrototypeRoute = createRoute({
  method: 'get',
  path: '/prototype',
  operationId: 'prototype',
  responses: { 200: { description: 'OK' } },
} as const)

export const getToStringRoute = createRoute({
  method: 'get',
  path: '/toString',
  operationId: 'toString',
  responses: { 200: { description: 'OK' } },
} as const)

export const getValueOfRoute = createRoute({
  method: 'get',
  path: '/valueOf',
  operationId: 'valueOf',
  responses: { 200: { description: 'OK' } },
} as const)

export const getHasOwnPropertyRoute = createRoute({
  method: 'get',
  path: '/hasOwnProperty',
  operationId: 'hasOwnProperty',
  responses: { 200: { description: 'OK' } },
} as const)

export const getNameCollisionsRoute = createRoute({
  method: 'get',
  path: '/name-collisions',
  operationId: 'getNameCollisions',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({
            User: z.string().exactOptional(),
            user: z.string().exactOptional(),
            USER: z.string().exactOptional(),
            id: z.string().exactOptional(),
            ID: z.string().exactOptional(),
            Id: z.string().exactOptional(),
          }),
        },
      },
    },
  },
} as const)
