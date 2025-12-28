import { createRoute, z } from '@hono/zod-openapi'

const classSchema = z
  .object({
    class: z.string().openapi({ type: 'string' }),
    extends: z.string().openapi({ type: 'string' }),
    implements: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: {
      class: { type: 'string' },
      extends: { type: 'string' },
      implements: { type: 'array', items: { type: 'string' } },
    },
  })
  .openapi('class')

const interfaceSchema = z
  .object({ name: z.string().openapi({ type: 'string' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { name: { type: 'string' } } })
  .openapi('interface')

const typeSchema = z
  .object({ type: z.string().openapi({ type: 'string' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { type: { type: 'string' } } })
  .openapi('type')

const functionSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    return: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { name: { type: 'string' }, return: { type: 'string' } } })
  .openapi('function')

const enumSchema = z
  .object({
    values: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { values: { type: 'array', items: { type: 'string' } } } })
  .openapi('enum')

const constSchema = z
  .object({ value: z.string().openapi({ type: 'string' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { value: { type: 'string' } } })
  .openapi('const')

const nullSchema = z
  .object({ isNull: z.boolean().openapi({ type: 'boolean' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { isNull: { type: 'boolean' } } })
  .openapi('null')

const ObjectSchema = z
  .object({ data: z.object({}).openapi({ type: 'object' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { data: { type: 'object' } } })
  .openapi('Object')

const ArraySchema = z
  .object({
    items: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { items: { type: 'array', items: { type: 'string' } } } })
  .openapi('Array')

const StringSchema = z
  .object({ value: z.string().openapi({ type: 'string' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { value: { type: 'string' } } })
  .openapi('String')

const NumberSchema = z
  .object({ value: z.number().openapi({ type: 'number' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { value: { type: 'number' } } })
  .openapi('Number')

const BooleanSchema = z
  .object({ value: z.boolean().openapi({ type: 'boolean' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { value: { type: 'boolean' } } })
  .openapi('Boolean')

const DateSchema = z
  .object({ timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { timestamp: { type: 'string', format: 'date-time' } } })
  .openapi('Date')

const ErrorSchema = z
  .object({ message: z.string().openapi({ type: 'string' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { message: { type: 'string' } } })
  .openapi('Error')

const PromiseSchema = z
  .object({ status: z.string().openapi({ type: 'string' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { status: { type: 'string' } } })
  .openapi('Promise')

const MapSchema = z
  .record(z.string(), z.string().optional().openapi({ type: 'string' }))
  .optional()
  .openapi({ type: 'object' })
  .openapi('Map')

const SetSchema = z
  .object({
    values: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', uniqueItems: true, items: { type: 'string' } }),
  })
  .partial()
  .optional()
  .openapi({
    type: 'object',
    properties: { values: { type: 'array', uniqueItems: true, items: { type: 'string' } } },
  })
  .openapi('Set')

const UserSchema = z
  .object({ id: z.string().openapi({ type: 'string' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { id: { type: 'string' } } })
  .openapi('User')

const userSchema = z
  .object({ id: z.int().openapi({ type: 'integer' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { id: { type: 'integer' } } })
  .openapi('user')

const USERSchema = z
  .object({ id: z.number().openapi({ type: 'number' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { id: { type: 'number' } } })
  .openapi('USER')

const MyModelSchema = z
  .object({ value: z.string().openapi({ type: 'string' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { value: { type: 'string' } } })
  .openapi('MyModel')

const myModelSchema = z
  .object({ value: z.int().openapi({ type: 'integer' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { value: { type: 'integer' } } })
  .openapi('myModel')

const MYMODELSchema = z
  .object({ value: z.boolean().openapi({ type: 'boolean' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { value: { type: 'boolean' } } })
  .openapi('MYMODEL')

const mymodelSchema = z
  .object({ value: z.number().openapi({ type: 'number' }) })
  .partial()
  .optional()
  .openapi({ type: 'object', properties: { value: { type: 'number' } } })
  .openapi('mymodel')

const ReservedPropertiesSchema = z
  .object({
    class: z.string().optional().openapi({ type: 'string' }),
    type: z.string().optional().openapi({ type: 'string' }),
    default: z.string().optional().openapi({ type: 'string' }),
    null: z.string().optional().openapi({ type: 'string' }),
    true: z.string().optional().openapi({ type: 'string' }),
    false: z.string().optional().openapi({ type: 'string' }),
    if: z.string().optional().openapi({ type: 'string' }),
    else: z.string().optional().openapi({ type: 'string' }),
    for: z.string().optional().openapi({ type: 'string' }),
    while: z.string().optional().openapi({ type: 'string' }),
    do: z.string().optional().openapi({ type: 'string' }),
    switch: z.string().optional().openapi({ type: 'string' }),
    case: z.string().optional().openapi({ type: 'string' }),
    break: z.string().optional().openapi({ type: 'string' }),
    continue: z.string().optional().openapi({ type: 'string' }),
    return: z.string().optional().openapi({ type: 'string' }),
    function: z.string().optional().openapi({ type: 'string' }),
    var: z.string().optional().openapi({ type: 'string' }),
    let: z.string().optional().openapi({ type: 'string' }),
    const: z.string().optional().openapi({ type: 'string' }),
    new: z.string().optional().openapi({ type: 'string' }),
    delete: z.string().optional().openapi({ type: 'string' }),
    typeof: z.string().optional().openapi({ type: 'string' }),
    instanceof: z.string().optional().openapi({ type: 'string' }),
    void: z.string().optional().openapi({ type: 'string' }),
    this: z.string().optional().openapi({ type: 'string' }),
    super: z.string().optional().openapi({ type: 'string' }),
    import: z.string().optional().openapi({ type: 'string' }),
    export: z.string().optional().openapi({ type: 'string' }),
    from: z.string().optional().openapi({ type: 'string' }),
    as: z.string().optional().openapi({ type: 'string' }),
    async: z.string().optional().openapi({ type: 'string' }),
    await: z.string().optional().openapi({ type: 'string' }),
    yield: z.string().optional().openapi({ type: 'string' }),
    try: z.string().optional().openapi({ type: 'string' }),
    catch: z.string().optional().openapi({ type: 'string' }),
    finally: z.string().optional().openapi({ type: 'string' }),
    throw: z.string().optional().openapi({ type: 'string' }),
    extends: z.string().optional().openapi({ type: 'string' }),
    implements: z.string().optional().openapi({ type: 'string' }),
    interface: z.string().optional().openapi({ type: 'string' }),
    package: z.string().optional().openapi({ type: 'string' }),
    private: z.string().optional().openapi({ type: 'string' }),
    protected: z.string().optional().openapi({ type: 'string' }),
    public: z.string().optional().openapi({ type: 'string' }),
    static: z.string().optional().openapi({ type: 'string' }),
    enum: z.string().optional().openapi({ type: 'string' }),
    abstract: z.string().optional().openapi({ type: 'string' }),
    final: z.string().optional().openapi({ type: 'string' }),
    native: z.string().optional().openapi({ type: 'string' }),
    synchronized: z.string().optional().openapi({ type: 'string' }),
    transient: z.string().optional().openapi({ type: 'string' }),
    volatile: z.string().optional().openapi({ type: 'string' }),
    goto: z.string().optional().openapi({ type: 'string' }),
    debugger: z.string().optional().openapi({ type: 'string' }),
    with: z.string().optional().openapi({ type: 'string' }),
    in: z.string().optional().openapi({ type: 'string' }),
    of: z.string().optional().openapi({ type: 'string' }),
    get: z.string().optional().openapi({ type: 'string' }),
    set: z.string().optional().openapi({ type: 'string' }),
    arguments: z.string().optional().openapi({ type: 'string' }),
    eval: z.string().optional().openapi({ type: 'string' }),
    constructor: z.string().optional().openapi({ type: 'string' }),
    prototype: z.string().optional().openapi({ type: 'string' }),
    __proto__: z.string().optional().openapi({ type: 'string' }),
    __defineGetter__: z.string().optional().openapi({ type: 'string' }),
    __defineSetter__: z.string().optional().openapi({ type: 'string' }),
    __lookupGetter__: z.string().optional().openapi({ type: 'string' }),
    __lookupSetter__: z.string().optional().openapi({ type: 'string' }),
    hasOwnProperty: z.string().optional().openapi({ type: 'string' }),
    isPrototypeOf: z.string().optional().openapi({ type: 'string' }),
    propertyIsEnumerable: z.string().optional().openapi({ type: 'string' }),
    toLocaleString: z.string().optional().openapi({ type: 'string' }),
    toString: z.string().optional().openapi({ type: 'string' }),
    valueOf: z.string().optional().openapi({ type: 'string' }),
  })
  .optional()
  .openapi({
    type: 'object',
    properties: {
      class: { type: 'string' },
      type: { type: 'string' },
      default: { type: 'string' },
      null: { type: 'string' },
      true: { type: 'string' },
      false: { type: 'string' },
      if: { type: 'string' },
      else: { type: 'string' },
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
      __proto__: { type: 'string' },
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
    and: z.string().openapi({ type: 'string' }),
    as: z.string().openapi({ type: 'string' }),
    assert: z.string().openapi({ type: 'string' }),
    break: z.string().openapi({ type: 'string' }),
    class: z.string().openapi({ type: 'string' }),
    continue: z.string().openapi({ type: 'string' }),
    def: z.string().openapi({ type: 'string' }),
    del: z.string().openapi({ type: 'string' }),
    elif: z.string().openapi({ type: 'string' }),
    else: z.string().openapi({ type: 'string' }),
    except: z.string().openapi({ type: 'string' }),
    exec: z.string().openapi({ type: 'string' }),
    finally: z.string().openapi({ type: 'string' }),
    for: z.string().openapi({ type: 'string' }),
    from: z.string().openapi({ type: 'string' }),
    global: z.string().openapi({ type: 'string' }),
    if: z.string().openapi({ type: 'string' }),
    import: z.string().openapi({ type: 'string' }),
    in: z.string().openapi({ type: 'string' }),
    is: z.string().openapi({ type: 'string' }),
    lambda: z.string().openapi({ type: 'string' }),
    not: z.string().openapi({ type: 'string' }),
    or: z.string().openapi({ type: 'string' }),
    pass: z.string().openapi({ type: 'string' }),
    print: z.string().openapi({ type: 'string' }),
    raise: z.string().openapi({ type: 'string' }),
    return: z.string().openapi({ type: 'string' }),
    try: z.string().openapi({ type: 'string' }),
    while: z.string().openapi({ type: 'string' }),
    with: z.string().openapi({ type: 'string' }),
    yield: z.string().openapi({ type: 'string' }),
    None: z.string().openapi({ type: 'string' }),
    true: z.string().openapi({ type: 'string' }),
    false: z.string().openapi({ type: 'string' }),
    nonlocal: z.string().openapi({ type: 'string' }),
    async: z.string().openapi({ type: 'string' }),
    await: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .optional()
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
      else: { type: 'string' },
      except: { type: 'string' },
      exec: { type: 'string' },
      finally: { type: 'string' },
      for: { type: 'string' },
      from: { type: 'string' },
      global: { type: 'string' },
      if: { type: 'string' },
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
    break: z.string().openapi({ type: 'string' }),
    case: z.string().openapi({ type: 'string' }),
    chan: z.string().openapi({ type: 'string' }),
    const: z.string().openapi({ type: 'string' }),
    continue: z.string().openapi({ type: 'string' }),
    default: z.string().openapi({ type: 'string' }),
    defer: z.string().openapi({ type: 'string' }),
    else: z.string().openapi({ type: 'string' }),
    fallthrough: z.string().openapi({ type: 'string' }),
    for: z.string().openapi({ type: 'string' }),
    func: z.string().openapi({ type: 'string' }),
    go: z.string().openapi({ type: 'string' }),
    goto: z.string().openapi({ type: 'string' }),
    if: z.string().openapi({ type: 'string' }),
    import: z.string().openapi({ type: 'string' }),
    interface: z.string().openapi({ type: 'string' }),
    map: z.string().openapi({ type: 'string' }),
    package: z.string().openapi({ type: 'string' }),
    range: z.string().openapi({ type: 'string' }),
    return: z.string().openapi({ type: 'string' }),
    select: z.string().openapi({ type: 'string' }),
    struct: z.string().openapi({ type: 'string' }),
    switch: z.string().openapi({ type: 'string' }),
    type: z.string().openapi({ type: 'string' }),
    var: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .optional()
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
      else: { type: 'string' },
      fallthrough: { type: 'string' },
      for: { type: 'string' },
      func: { type: 'string' },
      go: { type: 'string' },
      goto: { type: 'string' },
      if: { type: 'string' },
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
    as: z.string().openapi({ type: 'string' }),
    async: z.string().openapi({ type: 'string' }),
    await: z.string().openapi({ type: 'string' }),
    break: z.string().openapi({ type: 'string' }),
    const: z.string().openapi({ type: 'string' }),
    continue: z.string().openapi({ type: 'string' }),
    crate: z.string().openapi({ type: 'string' }),
    dyn: z.string().openapi({ type: 'string' }),
    else: z.string().openapi({ type: 'string' }),
    enum: z.string().openapi({ type: 'string' }),
    extern: z.string().openapi({ type: 'string' }),
    false: z.string().openapi({ type: 'string' }),
    fn: z.string().openapi({ type: 'string' }),
    for: z.string().openapi({ type: 'string' }),
    if: z.string().openapi({ type: 'string' }),
    impl: z.string().openapi({ type: 'string' }),
    in: z.string().openapi({ type: 'string' }),
    let: z.string().openapi({ type: 'string' }),
    loop: z.string().openapi({ type: 'string' }),
    match: z.string().openapi({ type: 'string' }),
    mod: z.string().openapi({ type: 'string' }),
    move: z.string().openapi({ type: 'string' }),
    mut: z.string().openapi({ type: 'string' }),
    pub: z.string().openapi({ type: 'string' }),
    ref: z.string().openapi({ type: 'string' }),
    return: z.string().openapi({ type: 'string' }),
    self: z.string().openapi({ type: 'string' }),
    Self: z.string().openapi({ type: 'string' }),
    static: z.string().openapi({ type: 'string' }),
    struct: z.string().openapi({ type: 'string' }),
    super: z.string().openapi({ type: 'string' }),
    trait: z.string().openapi({ type: 'string' }),
    true: z.string().openapi({ type: 'string' }),
    type: z.string().openapi({ type: 'string' }),
    unsafe: z.string().openapi({ type: 'string' }),
    use: z.string().openapi({ type: 'string' }),
    where: z.string().openapi({ type: 'string' }),
    while: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .optional()
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
      else: { type: 'string' },
      enum: { type: 'string' },
      extern: { type: 'string' },
      false: { type: 'string' },
      fn: { type: 'string' },
      for: { type: 'string' },
      if: { type: 'string' },
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

const classParamsSchema = z
  .string()
  .optional()
  .openapi({ param: { name: 'class', in: 'query', schema: { type: 'string' } }, type: 'string' })

const typeParamsSchema = z
  .string()
  .optional()
  .openapi({ param: { name: 'type', in: 'query', schema: { type: 'string' } }, type: 'string' })

const defaultParamsSchema = z
  .string()
  .optional()
  .openapi({ param: { name: 'default', in: 'query', schema: { type: 'string' } }, type: 'string' })

const nullParamsSchema = z
  .string()
  .optional()
  .openapi({ param: { name: 'null', in: 'query', schema: { type: 'string' } }, type: 'string' })

const trueParamsSchema = z
  .string()
  .optional()
  .openapi({ param: { name: 'true', in: 'query', schema: { type: 'string' } }, type: 'string' })

const falseParamsSchema = z
  .string()
  .optional()
  .openapi({ param: { name: 'false', in: 'query', schema: { type: 'string' } }, type: 'string' })

export const getClassRoute = createRoute({
  method: 'get',
  path: '/class',
  operationId: 'class',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: classSchema } } },
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
              User: z.string().openapi({ type: 'string' }),
              user: z.string().openapi({ type: 'string' }),
              USER: z.string().openapi({ type: 'string' }),
              id: z.string().openapi({ type: 'string' }),
              ID: z.string().openapi({ type: 'string' }),
              Id: z.string().openapi({ type: 'string' }),
            })
            .partial()
            .optional()
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
