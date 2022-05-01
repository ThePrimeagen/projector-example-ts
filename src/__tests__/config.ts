import { isOperationCommand, getTerms, getOperation, Operation } from "../config";

test("should ensure we get operations and terms", function() {
    expect(isOperationCommand("add")).toEqual(true);
    expect(isOperationCommand("rm")).toEqual(true);
    expect(isOperationCommand("print")).toEqual(false);
    expect(isOperationCommand("foo")).toEqual(false);


    expect(getTerms(["add", "foo", "bar"])).toEqual(["foo", "bar"]);
    expect(getTerms(["rm", "foo", "bar"])).toEqual(["foo", "bar"]);
    expect(getTerms(["print", "foo", "bar"])).toEqual(["print", "foo", "bar"]);

    expect(getOperation(["add", "foo", "bar"])).toEqual(Operation.Add);
    expect(getOperation(["rm", "foo", "bar"])).toEqual(Operation.Remove);
    expect(getOperation(["print", "foo", "bar"])).toEqual(Operation.Print);
});

