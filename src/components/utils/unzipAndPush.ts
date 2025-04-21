import { tmpdir } from 'os';
import { join } from 'path';
import fs from 'fs-extra';
import simpleGit from 'simple-git';
import unzipper from 'unzipper';
import fetch from 'node-fetch';

export async function unzipAndPush(token: string): Promise<string> {
  const tempPath = join(tmpdir(), `portfolio-${Date.now()}`);
  await fs.ensureDir(tempPath);

  // Simulate downloaded zip
  const zipBuffer = await fs.readFile('template.zip'); // Replace with real buffer in production

  await new Promise((resolve, reject) => {
    const stream = unzipper.Extract({ path: tempPath });
    stream.on('close', resolve);
    stream.on('error', reject);
    stream.end(zipBuffer);
  });

  // Create repo
  const repoRes = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'my-portfolio', private: false }),
  });

  const repoData = await repoRes.json();
  const repoUrl = repoData.clone_url.replace('https://', `https://${token}@`);

  const git = simpleGit(tempPath);
  await git.init();
  await git.addRemote('origin', repoUrl);
  await git.add('.');
  await git.commit('Initial commit');
  await git.push('origin', 'main');

  return repoData.html_url;
}
