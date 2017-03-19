b={}
b[1] = 'asd'
b[2]=44
for i=1,#b do -- the # operator is the length operator in Lua
    print(b[i]) 
end

--a = torch.Tensor(5,3)
a = torch.rand(5,3)
print(a)
b=torch.rand(3,4)
print(b)



function addTensors(a,b)
    return b -- FIX ME
end


a = torch.ones(5,2) --1111
b = torch.Tensor(2,5):fill(4) --44444
print(addTensors(a,b))
