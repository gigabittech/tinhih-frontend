const updateState = (
  set,
  key,
  { loading, error, message, success, update = {} }
) => {
  set((state) => {
    // Extract previous state values
    const prevState = {
      loading: state.isLoading?.[key],
      error: state.isError?.[key],
      success: state.isSuccess?.[key],
      message: state.message?.[key],
      data: state[key], // Preserve existing data related to the key
    };

    // Prevent unnecessary state updates
    const hasStateChanged =
      loading !== prevState.loading ||
      error !== prevState.error ||
      success !== prevState.success ||
      message !== prevState.message ||
      Object.keys(update).some((k) => update[k] !== prevState.data?.[k]);

    if (!hasStateChanged) {
      return state; // Avoid unnecessary re-renders
    }

    return {
      ...state,
      isLoading: { ...state.isLoading, [key]: loading ?? prevState.loading },
      isError: { ...state.isError, [key]: error ?? prevState.error },
      isSuccess: { ...state.isSuccess, [key]: success ?? prevState.success },
      message: { ...state.message, [key]: message ?? prevState.message },
      [key]: { ...prevState.data, ...update }, // Properly merge updates
    };
  });
};

export default updateState;
