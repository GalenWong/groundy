/* eslint-disable prefer-destructuring */
import { renderHook, act } from '@testing-library/react-hooks';
import { ipcRenderer } from '../mocks/electron';
import useIpcProgresses from '../../app/hooks/useIpcProgresses';
import { Progress } from '../../app/types';

jest.mock('electron');
describe('useIpcProgresses', () => {
  beforeEach(() => {
    ipcRenderer.on.mockReset();
  });

  it('receives updates', () => {
    const { result } = renderHook(() => useIpcProgresses());
    expect(result.current).toStrictEqual({});
    let notifyProgress: CallableFunction = () => {};

    notifyProgress = ipcRenderer.on.mock.calls[0][1];
    const testProgress1: Progress = {
      total: BigInt(100),
      current: BigInt(1),
      ytID: 'abc',
    };
    act(() => {
      notifyProgress({}, testProgress1);
    });
    expect(result.current).toStrictEqual({ abc: testProgress1 });

    notifyProgress = ipcRenderer.on.mock.calls[1][1];
    const testProgress2: Progress = {
      total: BigInt(100),
      current: BigInt(1),
      ytID: 'efg',
    };
    act(() => {
      notifyProgress({}, testProgress2);
    });
    expect(result.current).toStrictEqual({
      abc: testProgress1,
      efg: testProgress2,
    });
  });

  it('duplicate updates overrides previous entry', () => {
    const { result } = renderHook(() => useIpcProgresses());

    let notifyProgress: CallableFunction = () => {};
    notifyProgress = ipcRenderer.on.mock.calls[0][1];
    let testProgress: Progress = {
      total: BigInt(100),
      current: BigInt(1),
      ytID: 'abc',
    };

    act(() => {
      notifyProgress({}, testProgress);
    });
    expect(result.current).toStrictEqual({ abc: testProgress });

    notifyProgress = ipcRenderer.on.mock.calls[1][1];
    testProgress = {
      total: BigInt(100),
      current: BigInt(2),
      ytID: 'abc',
    };

    act(() => {
      notifyProgress({}, testProgress);
    });
    expect(result.current).toStrictEqual({ abc: testProgress });
  });
});
