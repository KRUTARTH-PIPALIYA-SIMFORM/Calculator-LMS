export default function factorial(n) {
    if (n < 0) return NaN;
    n = BigInt(n);
    let ans = n;
    while (--n) {
        ans *= n;
    }
    return ans;
}
