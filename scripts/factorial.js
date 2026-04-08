export default function factorial(n) {
    if (n < 0) return NaN;
    let ans = n;
    while (--n) {
        ans *= n;
    }
    return ans;
}
