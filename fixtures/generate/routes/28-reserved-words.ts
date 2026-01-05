import { createRoute, z } from '@hono/zod-openapi'

const ClassSchema = z
  .object({
    class: z.string().exactOptional().openapi({ type: 'string' }),
    extends: z.string().exactOptional().openapi({ type: 'string' }),
    implements: z
      .array(z.string().openapi({ type: 'string' }))
      .exactOptional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      class: { type: 'string' },
      extends: { type: 'string' },
      implements: { type: 'array', items: { type: 'string' } },
    },
  })
  .openapi('Class')

const InterfaceSchema = z
  .object({ name: z.string().exactOptional().openapi({ type: 'string' }) })
  .openapi({ type: 'object', properties: { name: { type: 'string' } } })
  .openapi('Interface')

const TypeSchema = z
  .object({ type: z.string().exactOptional().openapi({ type: 'string' }) })
  .openapi({ type: 'object', properties: { type: { type: 'string' } } })
  .openapi('Type')

const FunctionSchema = z
  .object({
    name: z.string().exactOptional().openapi({ type: 'string' }),
    return: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({ type: 'object', properties: { name: { type: 'string' }, return: { type: 'string' } } })
  .openapi('Function')

const EnumSchema = z
  .object({
    values: z
      .array(z.string().openapi({ type: 'string' }))
      .exactOptional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .openapi({ type: 'object', properties: { values: { type: 'array', items: { type: 'string' } } } })
  .openapi('Enum')

const ConstSchema = z
  .object({ value: z.string().exactOptional().openapi({ type: 'string' }) })
  .openapi({ type: 'object', properties: { value: { type: 'string' } } })
  .openapi('Const')

const NullSchema = z
  .object({ isNull: z.boolean().exactOptional().openapi({ type: 'boolean' }) })
  .openapi({ type: 'object', properties: { isNull: { type: 'boolean' } } })
  .openapi('Null')

const ObjectSchema = z
  .object({ data: z.object({}).exactOptional().openapi({ type: 'object' }) })
  .openapi({ type: 'object', properties: { data: { type: 'object' } } })
  .openapi('Object')

const ArraySchema = z
  .object({
    items: z
      .array(z.string().openapi({ type: 'string' }))
      .exactOptional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .openapi({ type: 'object', properties: { items: { type: 'array', items: { type: 'string' } } } })
  .openapi('Array')

const StringSchema = z
  .object({ value: z.string().exactOptional().openapi({ type: 'string' }) })
  .openapi({ type: 'object', properties: { value: { type: 'string' } } })
  .openapi('String')

const NumberSchema = z
  .object({ value: z.number().exactOptional().openapi({ type: 'number' }) })
  .openapi({ type: 'object', properties: { value: { type: 'number' } } })
  .openapi('Number')

const BooleanSchema = z
  .object({ value: z.boolean().exactOptional().openapi({ type: 'boolean' }) })
  .openapi({ type: 'object', properties: { value: { type: 'boolean' } } })
  .openapi('Boolean')

const DateSchema = z
  .object({
    timestamp: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({ type: 'object', properties: { timestamp: { type: 'string', format: 'date-time' } } })
  .openapi('Date')

const ErrorSchema = z
  .object({ message: z.string().exactOptional().openapi({ type: 'string' }) })
  .openapi({ type: 'object', properties: { message: { type: 'string' } } })
  .openapi('Error')

const PromiseSchema = z
  .object({ status: z.string().exactOptional().openapi({ type: 'string' }) })
  .openapi({ type: 'object', properties: { status: { type: 'string' } } })
  .openapi('Promise')

const MapSchema = z
  .record(z.string(), z.string().openapi({ type: 'string' }))
  .openapi({ type: 'object', additionalProperties: { type: 'string' } })
  .openapi('Map')

const SetSchema = z
  .object({
    values: z
      .array(z.string().openapi({ type: 'string' }))
      .exactOptional()
      .openapi({ type: 'array', uniqueItems: true, items: { type: 'string' } }),
  })
  .openapi({
    type: 'object',
    properties: { values: { type: 'array', uniqueItems: true, items: { type: 'string' } } },
  })
  .openapi('Set')

const UserSchema = z
  .object({ id: z.int().exactOptional().openapi({ type: 'integer' }) })
  .openapi({ type: 'object', properties: { id: { type: 'integer' } } })
  .openapi('User')

const USERSchema = z
  .object({ id: z.number().exactOptional().openapi({ type: 'number' }) })
  .openapi({ type: 'object', properties: { id: { type: 'number' } } })
  .openapi('USER')

const MyModelSchema = z
  .object({ value: z.int().exactOptional().openapi({ type: 'integer' }) })
  .openapi({ type: 'object', properties: { value: { type: 'integer' } } })
  .openapi('MyModel')

const MYMODELSchema = z
  .object({ value: z.boolean().exactOptional().openapi({ type: 'boolean' }) })
  .openapi({ type: 'object', properties: { value: { type: 'boolean' } } })
  .openapi('MYMODEL')

const MymodelSchema = z
  .object({ value: z.number().exactOptional().openapi({ type: 'number' }) })
  .openapi({ type: 'object', properties: { value: { type: 'number' } } })
  .openapi('Mymodel')

const ReservedPropertiesSchema = z
  .object({
    class: z.string().openapi({ type: 'string' }),
    type: z.string().openapi({ type: 'string' }),
    default: z.string().openapi({ type: 'string' }),
    null: z.string().exactOptional().openapi({ type: 'string' }),
    true: z.string().exactOptional().openapi({ type: 'string' }),
    false: z.string().exactOptional().openapi({ type: 'string' }),
    if: z.string().exactOptional().openapi({ type: 'string' }),
    else: z.string().exactOptional().openapi({ type: 'string' }),
    for: z.string().exactOptional().openapi({ type: 'string' }),
    while: z.string().exactOptional().openapi({ type: 'string' }),
    do: z.string().exactOptional().openapi({ type: 'string' }),
    switch: z.string().exactOptional().openapi({ type: 'string' }),
    case: z.string().exactOptional().openapi({ type: 'string' }),
    break: z.string().exactOptional().openapi({ type: 'string' }),
    continue: z.string().exactOptional().openapi({ type: 'string' }),
    return: z.string().exactOptional().openapi({ type: 'string' }),
    function: z.string().exactOptional().openapi({ type: 'string' }),
    var: z.string().exactOptional().openapi({ type: 'string' }),
    let: z.string().exactOptional().openapi({ type: 'string' }),
    const: z.string().exactOptional().openapi({ type: 'string' }),
    new: z.string().exactOptional().openapi({ type: 'string' }),
    delete: z.string().exactOptional().openapi({ type: 'string' }),
    typeof: z.string().exactOptional().openapi({ type: 'string' }),
    instanceof: z.string().exactOptional().openapi({ type: 'string' }),
    void: z.string().exactOptional().openapi({ type: 'string' }),
    this: z.string().exactOptional().openapi({ type: 'string' }),
    super: z.string().exactOptional().openapi({ type: 'string' }),
    import: z.string().exactOptional().openapi({ type: 'string' }),
    export: z.string().exactOptional().openapi({ type: 'string' }),
    from: z.string().exactOptional().openapi({ type: 'string' }),
    as: z.string().exactOptional().openapi({ type: 'string' }),
    async: z.string().exactOptional().openapi({ type: 'string' }),
    await: z.string().exactOptional().openapi({ type: 'string' }),
    yield: z.string().exactOptional().openapi({ type: 'string' }),
    try: z.string().exactOptional().openapi({ type: 'string' }),
    catch: z.string().exactOptional().openapi({ type: 'string' }),
    finally: z.string().exactOptional().openapi({ type: 'string' }),
    throw: z.string().exactOptional().openapi({ type: 'string' }),
    extends: z.string().exactOptional().openapi({ type: 'string' }),
    implements: z.string().exactOptional().openapi({ type: 'string' }),
    interface: z.string().exactOptional().openapi({ type: 'string' }),
    package: z.string().exactOptional().openapi({ type: 'string' }),
    private: z.string().exactOptional().openapi({ type: 'string' }),
    protected: z.string().exactOptional().openapi({ type: 'string' }),
    public: z.string().exactOptional().openapi({ type: 'string' }),
    static: z.string().exactOptional().openapi({ type: 'string' }),
    enum: z.string().exactOptional().openapi({ type: 'string' }),
    abstract: z.string().exactOptional().openapi({ type: 'string' }),
    final: z.string().exactOptional().openapi({ type: 'string' }),
    native: z.string().exactOptional().openapi({ type: 'string' }),
    synchronized: z.string().exactOptional().openapi({ type: 'string' }),
    transient: z.string().exactOptional().openapi({ type: 'string' }),
    volatile: z.string().exactOptional().openapi({ type: 'string' }),
    goto: z.string().exactOptional().openapi({ type: 'string' }),
    debugger: z.string().exactOptional().openapi({ type: 'string' }),
    with: z.string().exactOptional().openapi({ type: 'string' }),
    in: z.string().exactOptional().openapi({ type: 'string' }),
    of: z.string().exactOptional().openapi({ type: 'string' }),
    get: z.string().exactOptional().openapi({ type: 'string' }),
    set: z.string().exactOptional().openapi({ type: 'string' }),
    arguments: z.string().exactOptional().openapi({ type: 'string' }),
    eval: z.string().exactOptional().openapi({ type: 'string' }),
    constructor: z.string().exactOptional().openapi({ type: 'string' }),
    prototype: z.string().exactOptional().openapi({ type: 'string' }),
    __proto__: z.string().exactOptional().openapi({ type: 'string' }),
    __defineGetter__: z.string().exactOptional().openapi({ type: 'string' }),
    __defineSetter__: z.string().exactOptional().openapi({ type: 'string' }),
    __lookupGetter__: z.string().exactOptional().openapi({ type: 'string' }),
    __lookupSetter__: z.string().exactOptional().openapi({ type: 'string' }),
    hasOwnProperty: z.string().exactOptional().openapi({ type: 'string' }),
    isPrototypeOf: z.string().exactOptional().openapi({ type: 'string' }),
    propertyIsEnumerable: z.string().exactOptional().openapi({ type: 'string' }),
    toLocaleString: z.string().exactOptional().openapi({ type: 'string' }),
    toString: z.string().exactOptional().openapi({ type: 'string' }),
    valueOf: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['class', 'type', 'default', null, true, false],
    properties: {
      class: { type: 'string' },
      type: { type: 'string' },
      default: { type: 'string' },
      null: { type: 'string' },
      true: { type: 'string' },
      false: { type: 'string' },
      for: { type: 'string' },
      while: { type: 'string' },
      do: { type: 'string' },
      switch: { type: 'string' },
      case: { type: 'string' },
      break: { type: 'string' },
      continue: { type: 'string' },
      return: { type: 'string' },
      function: { type: 'string' },
      var: { type: 'string' },
      let: { type: 'string' },
      const: { type: 'string' },
      new: { type: 'string' },
      delete: { type: 'string' },
      typeof: { type: 'string' },
      instanceof: { type: 'string' },
      void: { type: 'string' },
      this: { type: 'string' },
      super: { type: 'string' },
      import: { type: 'string' },
      export: { type: 'string' },
      from: { type: 'string' },
      as: { type: 'string' },
      async: { type: 'string' },
      await: { type: 'string' },
      yield: { type: 'string' },
      try: { type: 'string' },
      catch: { type: 'string' },
      finally: { type: 'string' },
      throw: { type: 'string' },
      extends: { type: 'string' },
      implements: { type: 'string' },
      interface: { type: 'string' },
      package: { type: 'string' },
      private: { type: 'string' },
      protected: { type: 'string' },
      public: { type: 'string' },
      static: { type: 'string' },
      enum: { type: 'string' },
      abstract: { type: 'string' },
      final: { type: 'string' },
      native: { type: 'string' },
      synchronized: { type: 'string' },
      transient: { type: 'string' },
      volatile: { type: 'string' },
      goto: { type: 'string' },
      debugger: { type: 'string' },
      with: { type: 'string' },
      in: { type: 'string' },
      of: { type: 'string' },
      get: { type: 'string' },
      set: { type: 'string' },
      arguments: { type: 'string' },
      eval: { type: 'string' },
      constructor: { type: 'string' },
      prototype: { type: 'string' },
      __defineGetter__: { type: 'string' },
      __defineSetter__: { type: 'string' },
      __lookupGetter__: { type: 'string' },
      __lookupSetter__: { type: 'string' },
      hasOwnProperty: { type: 'string' },
      isPrototypeOf: { type: 'string' },
      propertyIsEnumerable: { type: 'string' },
      toLocaleString: { type: 'string' },
      toString: { type: 'string' },
      valueOf: { type: 'string' },
    },
  })
  .openapi('ReservedProperties')

const PythonReservedSchema = z
  .object({
    and: z.string().exactOptional().openapi({ type: 'string' }),
    as: z.string().exactOptional().openapi({ type: 'string' }),
    assert: z.string().exactOptional().openapi({ type: 'string' }),
    break: z.string().exactOptional().openapi({ type: 'string' }),
    class: z.string().exactOptional().openapi({ type: 'string' }),
    continue: z.string().exactOptional().openapi({ type: 'string' }),
    def: z.string().exactOptional().openapi({ type: 'string' }),
    del: z.string().exactOptional().openapi({ type: 'string' }),
    elif: z.string().exactOptional().openapi({ type: 'string' }),
    else: z.string().exactOptional().openapi({ type: 'string' }),
    except: z.string().exactOptional().openapi({ type: 'string' }),
    exec: z.string().exactOptional().openapi({ type: 'string' }),
    finally: z.string().exactOptional().openapi({ type: 'string' }),
    for: z.string().exactOptional().openapi({ type: 'string' }),
    from: z.string().exactOptional().openapi({ type: 'string' }),
    global: z.string().exactOptional().openapi({ type: 'string' }),
    if: z.string().exactOptional().openapi({ type: 'string' }),
    import: z.string().exactOptional().openapi({ type: 'string' }),
    in: z.string().exactOptional().openapi({ type: 'string' }),
    is: z.string().exactOptional().openapi({ type: 'string' }),
    lambda: z.string().exactOptional().openapi({ type: 'string' }),
    not: z.string().exactOptional().openapi({ type: 'string' }),
    or: z.string().exactOptional().openapi({ type: 'string' }),
    pass: z.string().exactOptional().openapi({ type: 'string' }),
    print: z.string().exactOptional().openapi({ type: 'string' }),
    raise: z.string().exactOptional().openapi({ type: 'string' }),
    return: z.string().exactOptional().openapi({ type: 'string' }),
    try: z.string().exactOptional().openapi({ type: 'string' }),
    while: z.string().exactOptional().openapi({ type: 'string' }),
    with: z.string().exactOptional().openapi({ type: 'string' }),
    yield: z.string().exactOptional().openapi({ type: 'string' }),
    None: z.string().exactOptional().openapi({ type: 'string' }),
    true: z.string().exactOptional().openapi({ type: 'string' }),
    false: z.string().exactOptional().openapi({ type: 'string' }),
    nonlocal: z.string().exactOptional().openapi({ type: 'string' }),
    async: z.string().exactOptional().openapi({ type: 'string' }),
    await: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: {
      and: { type: 'string' },
      as: { type: 'string' },
      assert: { type: 'string' },
      break: { type: 'string' },
      class: { type: 'string' },
      continue: { type: 'string' },
      def: { type: 'string' },
      del: { type: 'string' },
      elif: { type: 'string' },
      except: { type: 'string' },
      exec: { type: 'string' },
      finally: { type: 'string' },
      for: { type: 'string' },
      from: { type: 'string' },
      global: { type: 'string' },
      import: { type: 'string' },
      in: { type: 'string' },
      is: { type: 'string' },
      lambda: { type: 'string' },
      not: { type: 'string' },
      or: { type: 'string' },
      pass: { type: 'string' },
      print: { type: 'string' },
      raise: { type: 'string' },
      return: { type: 'string' },
      try: { type: 'string' },
      while: { type: 'string' },
      with: { type: 'string' },
      yield: { type: 'string' },
      None: { type: 'string' },
      true: { type: 'string' },
      false: { type: 'string' },
      nonlocal: { type: 'string' },
      async: { type: 'string' },
      await: { type: 'string' },
    },
  })
  .openapi('PythonReserved')

const GoReservedSchema = z
  .object({
    break: z.string().exactOptional().openapi({ type: 'string' }),
    case: z.string().exactOptional().openapi({ type: 'string' }),
    chan: z.string().exactOptional().openapi({ type: 'string' }),
    const: z.string().exactOptional().openapi({ type: 'string' }),
    continue: z.string().exactOptional().openapi({ type: 'string' }),
    default: z.string().exactOptional().openapi({ type: 'string' }),
    defer: z.string().exactOptional().openapi({ type: 'string' }),
    else: z.string().exactOptional().openapi({ type: 'string' }),
    fallthrough: z.string().exactOptional().openapi({ type: 'string' }),
    for: z.string().exactOptional().openapi({ type: 'string' }),
    func: z.string().exactOptional().openapi({ type: 'string' }),
    go: z.string().exactOptional().openapi({ type: 'string' }),
    goto: z.string().exactOptional().openapi({ type: 'string' }),
    if: z.string().exactOptional().openapi({ type: 'string' }),
    import: z.string().exactOptional().openapi({ type: 'string' }),
    interface: z.string().exactOptional().openapi({ type: 'string' }),
    map: z.string().exactOptional().openapi({ type: 'string' }),
    package: z.string().exactOptional().openapi({ type: 'string' }),
    range: z.string().exactOptional().openapi({ type: 'string' }),
    return: z.string().exactOptional().openapi({ type: 'string' }),
    select: z.string().exactOptional().openapi({ type: 'string' }),
    struct: z.string().exactOptional().openapi({ type: 'string' }),
    switch: z.string().exactOptional().openapi({ type: 'string' }),
    type: z.string().exactOptional().openapi({ type: 'string' }),
    var: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: {
      break: { type: 'string' },
      case: { type: 'string' },
      chan: { type: 'string' },
      const: { type: 'string' },
      continue: { type: 'string' },
      default: { type: 'string' },
      defer: { type: 'string' },
      fallthrough: { type: 'string' },
      for: { type: 'string' },
      func: { type: 'string' },
      go: { type: 'string' },
      goto: { type: 'string' },
      import: { type: 'string' },
      interface: { type: 'string' },
      map: { type: 'string' },
      package: { type: 'string' },
      range: { type: 'string' },
      return: { type: 'string' },
      select: { type: 'string' },
      struct: { type: 'string' },
      switch: { type: 'string' },
      type: { type: 'string' },
      var: { type: 'string' },
    },
  })
  .openapi('GoReserved')

const RustReservedSchema = z
  .object({
    as: z.string().exactOptional().openapi({ type: 'string' }),
    async: z.string().exactOptional().openapi({ type: 'string' }),
    await: z.string().exactOptional().openapi({ type: 'string' }),
    break: z.string().exactOptional().openapi({ type: 'string' }),
    const: z.string().exactOptional().openapi({ type: 'string' }),
    continue: z.string().exactOptional().openapi({ type: 'string' }),
    crate: z.string().exactOptional().openapi({ type: 'string' }),
    dyn: z.string().exactOptional().openapi({ type: 'string' }),
    else: z.string().exactOptional().openapi({ type: 'string' }),
    enum: z.string().exactOptional().openapi({ type: 'string' }),
    extern: z.string().exactOptional().openapi({ type: 'string' }),
    false: z.string().exactOptional().openapi({ type: 'string' }),
    fn: z.string().exactOptional().openapi({ type: 'string' }),
    for: z.string().exactOptional().openapi({ type: 'string' }),
    if: z.string().exactOptional().openapi({ type: 'string' }),
    impl: z.string().exactOptional().openapi({ type: 'string' }),
    in: z.string().exactOptional().openapi({ type: 'string' }),
    let: z.string().exactOptional().openapi({ type: 'string' }),
    loop: z.string().exactOptional().openapi({ type: 'string' }),
    match: z.string().exactOptional().openapi({ type: 'string' }),
    mod: z.string().exactOptional().openapi({ type: 'string' }),
    move: z.string().exactOptional().openapi({ type: 'string' }),
    mut: z.string().exactOptional().openapi({ type: 'string' }),
    pub: z.string().exactOptional().openapi({ type: 'string' }),
    ref: z.string().exactOptional().openapi({ type: 'string' }),
    return: z.string().exactOptional().openapi({ type: 'string' }),
    self: z.string().exactOptional().openapi({ type: 'string' }),
    Self: z.string().exactOptional().openapi({ type: 'string' }),
    static: z.string().exactOptional().openapi({ type: 'string' }),
    struct: z.string().exactOptional().openapi({ type: 'string' }),
    super: z.string().exactOptional().openapi({ type: 'string' }),
    trait: z.string().exactOptional().openapi({ type: 'string' }),
    true: z.string().exactOptional().openapi({ type: 'string' }),
    type: z.string().exactOptional().openapi({ type: 'string' }),
    unsafe: z.string().exactOptional().openapi({ type: 'string' }),
    use: z.string().exactOptional().openapi({ type: 'string' }),
    where: z.string().exactOptional().openapi({ type: 'string' }),
    while: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    properties: {
      as: { type: 'string' },
      async: { type: 'string' },
      await: { type: 'string' },
      break: { type: 'string' },
      const: { type: 'string' },
      continue: { type: 'string' },
      crate: { type: 'string' },
      dyn: { type: 'string' },
      enum: { type: 'string' },
      extern: { type: 'string' },
      false: { type: 'string' },
      fn: { type: 'string' },
      for: { type: 'string' },
      impl: { type: 'string' },
      in: { type: 'string' },
      let: { type: 'string' },
      loop: { type: 'string' },
      match: { type: 'string' },
      mod: { type: 'string' },
      move: { type: 'string' },
      mut: { type: 'string' },
      pub: { type: 'string' },
      ref: { type: 'string' },
      return: { type: 'string' },
      self: { type: 'string' },
      Self: { type: 'string' },
      static: { type: 'string' },
      struct: { type: 'string' },
      super: { type: 'string' },
      trait: { type: 'string' },
      true: { type: 'string' },
      type: { type: 'string' },
      unsafe: { type: 'string' },
      use: { type: 'string' },
      where: { type: 'string' },
      while: { type: 'string' },
    },
  })
  .openapi('RustReserved')

const ClassParamsSchema = z
  .string()
  .exactOptional()
  .openapi({ param: { name: 'class', in: 'query', schema: { type: 'string' } }, type: 'string' })

const TypeParamsSchema = z
  .string()
  .exactOptional()
  .openapi({ param: { name: 'type', in: 'query', schema: { type: 'string' } }, type: 'string' })

const DefaultParamsSchema = z
  .string()
  .exactOptional()
  .openapi({ param: { name: 'default', in: 'query', schema: { type: 'string' } }, type: 'string' })

const NullParamsSchema = z
  .string()
  .exactOptional()
  .openapi({ param: { name: 'null', in: 'query', schema: { type: 'string' } }, type: 'string' })

const TrueParamsSchema = z
  .string()
  .exactOptional()
  .openapi({ param: { name: 'true', in: 'query', schema: { type: 'string' } }, type: 'string' })

const FalseParamsSchema = z
  .string()
  .exactOptional()
  .openapi({ param: { name: 'false', in: 'query', schema: { type: 'string' } }, type: 'string' })

export const getClassRoute = createRoute({
  method: 'get',
  path: '/class',
  operationId: 'class',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ClassSchema } } },
  },
})

export const getInterfaceRoute = createRoute({
  method: 'get',
  path: '/interface',
  operationId: 'interface',
  responses: { 200: { description: 'OK' } },
})

export const getTypeRoute = createRoute({
  method: 'get',
  path: '/type',
  operationId: 'type',
  responses: { 200: { description: 'OK' } },
})

export const postFunctionRoute = createRoute({
  method: 'post',
  path: '/function',
  operationId: 'function',
  responses: { 200: { description: 'OK' } },
})

export const getReturnRoute = createRoute({
  method: 'get',
  path: '/return',
  operationId: 'return',
  responses: { 200: { description: 'OK' } },
})

export const getImportRoute = createRoute({
  method: 'get',
  path: '/import',
  operationId: 'import',
  responses: { 200: { description: 'OK' } },
})

export const getExportRoute = createRoute({
  method: 'get',
  path: '/export',
  operationId: 'export',
  responses: { 200: { description: 'OK' } },
})

export const getDefaultRoute = createRoute({
  method: 'get',
  path: '/default',
  operationId: 'default',
  responses: { 200: { description: 'OK' } },
})

export const postNewRoute = createRoute({
  method: 'post',
  path: '/new',
  operationId: 'new',
  responses: { 200: { description: 'OK' } },
})

export const deleteDeleteRoute = createRoute({
  method: 'delete',
  path: '/delete',
  operationId: 'delete',
  responses: { 200: { description: 'OK' } },
})

export const getVoidRoute = createRoute({
  method: 'get',
  path: '/void',
  operationId: 'void',
  responses: { 200: { description: 'OK' } },
})

export const getNullRoute = createRoute({
  method: 'get',
  path: '/null',
  responses: { 200: { description: 'OK' } },
})

export const getTrueRoute = createRoute({
  method: 'get',
  path: '/true',
  operationId: 'true',
  responses: { 200: { description: 'OK' } },
})

export const getFalseRoute = createRoute({
  method: 'get',
  path: '/false',
  responses: { 200: { description: 'OK' } },
})

export const getIfRoute = createRoute({
  method: 'get',
  path: '/if',
  operationId: 'if',
  responses: { 200: { description: 'OK' } },
})

export const getElseRoute = createRoute({
  method: 'get',
  path: '/else',
  operationId: 'else',
  responses: { 200: { description: 'OK' } },
})

export const getForRoute = createRoute({
  method: 'get',
  path: '/for',
  operationId: 'for',
  responses: { 200: { description: 'OK' } },
})

export const getWhileRoute = createRoute({
  method: 'get',
  path: '/while',
  operationId: 'while',
  responses: { 200: { description: 'OK' } },
})

export const getSwitchRoute = createRoute({
  method: 'get',
  path: '/switch',
  operationId: 'switch',
  responses: { 200: { description: 'OK' } },
})

export const getCaseRoute = createRoute({
  method: 'get',
  path: '/case',
  operationId: 'case',
  responses: { 200: { description: 'OK' } },
})

export const getBreakRoute = createRoute({
  method: 'get',
  path: '/break',
  operationId: 'break',
  responses: { 200: { description: 'OK' } },
})

export const getContinueRoute = createRoute({
  method: 'get',
  path: '/continue',
  operationId: 'continue',
  responses: { 200: { description: 'OK' } },
})

export const getTryRoute = createRoute({
  method: 'get',
  path: '/try',
  operationId: 'try',
  responses: { 200: { description: 'OK' } },
})

export const getCatchRoute = createRoute({
  method: 'get',
  path: '/catch',
  operationId: 'catch',
  responses: { 200: { description: 'OK' } },
})

export const getFinallyRoute = createRoute({
  method: 'get',
  path: '/finally',
  operationId: 'finally',
  responses: { 200: { description: 'OK' } },
})

export const getThrowRoute = createRoute({
  method: 'get',
  path: '/throw',
  operationId: 'throw',
  responses: { 200: { description: 'OK' } },
})

export const getAsyncRoute = createRoute({
  method: 'get',
  path: '/async',
  operationId: 'async',
  responses: { 200: { description: 'OK' } },
})

export const getAwaitRoute = createRoute({
  method: 'get',
  path: '/await',
  operationId: 'await',
  responses: { 200: { description: 'OK' } },
})

export const getYieldRoute = createRoute({
  method: 'get',
  path: '/yield',
  operationId: 'yield',
  responses: { 200: { description: 'OK' } },
})

export const getStaticRoute = createRoute({
  method: 'get',
  path: '/static',
  operationId: 'static',
  responses: { 200: { description: 'OK' } },
})

export const getPublicRoute = createRoute({
  method: 'get',
  path: '/public',
  operationId: 'public',
  responses: { 200: { description: 'OK' } },
})

export const getPrivateRoute = createRoute({
  method: 'get',
  path: '/private',
  operationId: 'private',
  responses: { 200: { description: 'OK' } },
})

export const getProtectedRoute = createRoute({
  method: 'get',
  path: '/protected',
  operationId: 'protected',
  responses: { 200: { description: 'OK' } },
})

export const getAbstractRoute = createRoute({
  method: 'get',
  path: '/abstract',
  operationId: 'abstract',
  responses: { 200: { description: 'OK' } },
})

export const getFinalRoute = createRoute({
  method: 'get',
  path: '/final',
  operationId: 'final',
  responses: { 200: { description: 'OK' } },
})

export const getExtendsRoute = createRoute({
  method: 'get',
  path: '/extends',
  operationId: 'extends',
  responses: { 200: { description: 'OK' } },
})

export const getImplementsRoute = createRoute({
  method: 'get',
  path: '/implements',
  operationId: 'implements',
  responses: { 200: { description: 'OK' } },
})

export const getPackageRoute = createRoute({
  method: 'get',
  path: '/package',
  operationId: 'package',
  responses: { 200: { description: 'OK' } },
})

export const getEnumRoute = createRoute({
  method: 'get',
  path: '/enum',
  operationId: 'enum',
  responses: { 200: { description: 'OK' } },
})

export const getConstRoute = createRoute({
  method: 'get',
  path: '/const',
  operationId: 'const',
  responses: { 200: { description: 'OK' } },
})

export const getLetRoute = createRoute({
  method: 'get',
  path: '/let',
  operationId: 'let',
  responses: { 200: { description: 'OK' } },
})

export const getVarRoute = createRoute({
  method: 'get',
  path: '/var',
  operationId: 'var',
  responses: { 200: { description: 'OK' } },
})

export const getThisRoute = createRoute({
  method: 'get',
  path: '/this',
  operationId: 'this',
  responses: { 200: { description: 'OK' } },
})

export const getSuperRoute = createRoute({
  method: 'get',
  path: '/super',
  operationId: 'super',
  responses: { 200: { description: 'OK' } },
})

export const getSelfRoute = createRoute({
  method: 'get',
  path: '/self',
  operationId: 'self',
  responses: { 200: { description: 'OK' } },
})

export const getConstructorRoute = createRoute({
  method: 'get',
  path: '/constructor',
  operationId: 'constructor',
  responses: { 200: { description: 'OK' } },
})

export const getPrototypeRoute = createRoute({
  method: 'get',
  path: '/prototype',
  operationId: 'prototype',
  responses: { 200: { description: 'OK' } },
})

export const getToStringRoute = createRoute({
  method: 'get',
  path: '/toString',
  operationId: 'toString',
  responses: { 200: { description: 'OK' } },
})

export const getValueOfRoute = createRoute({
  method: 'get',
  path: '/valueOf',
  operationId: 'valueOf',
  responses: { 200: { description: 'OK' } },
})

export const getHasOwnPropertyRoute = createRoute({
  method: 'get',
  path: '/hasOwnProperty',
  operationId: 'hasOwnProperty',
  responses: { 200: { description: 'OK' } },
})

export const getNameCollisionsRoute = createRoute({
  method: 'get',
  path: '/name-collisions',
  operationId: 'getNameCollisions',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({
              User: z.string().exactOptional().openapi({ type: 'string' }),
              user: z.string().exactOptional().openapi({ type: 'string' }),
              USER: z.string().exactOptional().openapi({ type: 'string' }),
              id: z.string().exactOptional().openapi({ type: 'string' }),
              ID: z.string().exactOptional().openapi({ type: 'string' }),
              Id: z.string().exactOptional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              properties: {
                User: { type: 'string' },
                user: { type: 'string' },
                USER: { type: 'string' },
                id: { type: 'string' },
                ID: { type: 'string' },
                Id: { type: 'string' },
              },
            }),
        },
      },
    },
  },
})
