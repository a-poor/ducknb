import { createMachine } from 'xstate';

type StateContext = {
    navTab: "" | null;
};

export const stateMachine = createMachine({
    context: {
        navTab: null,
    } as StateContext,
});
