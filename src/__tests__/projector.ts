import Projector from "../projector";

test("adding/finding keys", function() {
    const projector = Projector.empty("/foo/bar/baz");

    expect(projector.getValue("foo")).toEqual(undefined);
    projector.setValue("foo", "bar");
    expect(projector.getValue("foo")).toEqual("bar");
});

test("adding/finding keys adv", function() {
    const pData = {
        projector: {
            "/": {
                foo: "bar"
            },
            "/foo": {
                foo: "bar2"
            },
            "/foo/bar": {
                foo: "bar3"
            },
            "/foo/bar/baz": {
                foo: "bar4"
            },
        }
    };

    expect(new Projector("/foo/bar/baz", pData).getValue("foo")).toEqual("bar4");
    expect(new Projector("/foo/bar", pData).getValue("foo")).toEqual("bar3");
    expect(new Projector("/foo", pData).getValue("foo")).toEqual("bar2");
    expect(new Projector("/", pData).getValue("foo")).toEqual("bar");
});

test("rm keys", function() {
    const pData = {
        projector: {
            "/foo": {
                foo: "true",
            }
        }
    };

    let projector = new Projector("/foo/bar/baz", pData);
    projector.removeValue("foo");

    expect(projector.getValue("foo")).toEqual("true");

    projector = new Projector("/foo", pData);
    projector.removeValue("foo");
    expect(projector.getValue("foo")).toEqual(undefined);
});
