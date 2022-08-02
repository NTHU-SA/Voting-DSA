if ! command -v pm2 &> /dev/null
then
    echo "pm2 could not be found, please install pm2."
    exit
fi

cd Voting-DSA
echo "Pull the latest version from master"
git pull
echo "Restart pm2 manager"
pm2 restart 0
