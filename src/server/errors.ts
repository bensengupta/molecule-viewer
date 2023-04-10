import { commaList } from '@/utils/helpers';
import { TRPCError } from '@trpc/server';
import { SDFParseError } from './utils/sdf';

export class FieldError<
  T extends Record<string, string[]> = Record<string, string[]>
> extends Error {
  constructor(public errors: T) {
    super();
  }
}

export class CodeAlreadyExistsError extends TRPCError {
  constructor(value: string) {
    const message = `An element with the code '${value}' already exists.`;

    super({
      code: 'CONFLICT',
      message,
      cause: new FieldError({ code: [message] }),
    });
  }
}

export class CodeNotFoundError extends TRPCError {
  constructor(value: string) {
    const message = `An element with the code '${value}' does not exist.`;

    super({
      code: 'NOT_FOUND',
      message,
      cause: new FieldError({ code: [message] }),
    });
  }
}

export class ElementInUseError extends TRPCError {
  constructor(value: string, molecules: string[]) {
    const moleculeLabel = molecules.length === 1 ? 'molecule' : 'molecules';
    const message = `The element '${value}' is in use by ${moleculeLabel} ${commaList(
      molecules
    )}.\n\nPlease delete these molecules before proceeding.`;

    super({
      code: 'FORBIDDEN',
      message,
    });
  }
}

export class MoleculeAlreadyExistsError extends TRPCError {
  constructor(value: string) {
    const message = `A molecule with the name '${value}' already exists.`;

    super({
      code: 'CONFLICT',
      message,
      cause: new FieldError({ name: [message] }),
    });
  }
}

export class MoleculeNotFoundError extends TRPCError {
  constructor(value: string) {
    const message = `A molecule with the name '${value}' does not exist.`;

    super({
      code: 'NOT_FOUND',
      message,
      cause: new FieldError({ name: [message] }),
    });
  }
}

export class MoleculeInvalidSDFError extends TRPCError {
  constructor(sdfError: SDFParseError) {
    const message = sdfError.message;

    super({
      code: 'NOT_FOUND',
      message,
      cause: new FieldError({ fileContents: [message] }),
    });
  }
}
