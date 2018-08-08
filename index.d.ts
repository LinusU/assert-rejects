declare function assertRejects(promise: Promise<any>, error: (err: any) => boolean, message?: string): Promise<void>
declare function assertRejects(promise: Promise<any>, message: string): Promise<void>

export = assertRejects
