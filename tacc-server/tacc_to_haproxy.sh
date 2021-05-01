#Generating istio_status file
./istio-1.9.3/bin/istioctl proxy-status | grep "STALE" > istio_status.txt
kubectl get node | grep "DiskPressure" >> istio_status.txt
kubectl get node | grep "MemoryPressure" >> istio_status.txt
kubectl get node | grep "PIDPressure" >> istio_status.txt
kubectl get node | grep "NetworkUnavailable" >> istio_status.txt

# Sending istio_status file to HAproxy server
scp -i ./haproxy_key istio_status.txt ubuntu@149.165.172.138:~/
